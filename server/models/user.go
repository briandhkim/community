package models

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email     string `json:"email"`
	UID       string `json:"uuid"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  string `json:"password"`
}

func getCountByEmailAddress(e string) int16 {
	var count int16
	err := DB.QueryRow("SELECT COUNT(email) FROM users WHERE email = ?", e).Scan(&count)
	if err != nil {
		log.Panic(err)
	}

	return count
}

func getUserByEmailAddress(e string) User {
	var em, uid, fn, ln, pw string

	sql := "SELECT email, uid, firstName, lastName, password from users where email = ?"

	err := DB.QueryRow(sql, e).Scan(&em, &uid, &fn, &ln, &pw)
	if err != nil {
		log.Panic(err)
	}

	u := User{em, uid, fn, ln, pw}

	return u
}

func (u User) insertNewUser() error {

	bs, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.MinCost)
	if err != nil {
		return err
	}

	sql := "INSERT INTO users(email, uid, firstName, lastName, password) VALUES (?, ?, ?, ?, ?)"
	stmt, _ := DB.Prepare(sql)

	for {
		uID, _ := uuid.NewV4()
		_, err = stmt.Exec(u.Email, uID.String(), u.FirstName, u.LastName, string(bs))

		if err == nil {
			break
		}
	}

	return err
}

// CheckUserWithEmailExists checks if a user with provided email e exists.
func CheckUserWithEmailExists(e string) ([]byte, int) {

	count := getCountByEmailAddress(e)

	userExists := false

	if count > 0 {
		userExists = true
	}

	res := struct {
		UserExists bool `json:"userExists"`
	}{
		userExists,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK

}

// GetLoggedInUser checks and returns the logged in user based on cookie/session data
func GetLoggedInUser(r *http.Request) ([]byte, int) {

	if UserIsLoggedIn(r) {
		ue, err := GetUserEmailFromSession(r)

		if err == nil {
			u := getUserByEmailAddress(ue)
			u.Password = ""

			res := struct {
				UserFound bool `json:"userFound"`
				U         User `json:"user"`
			}{
				true,
				u,
			}

			rj, _ := json.Marshal(res)
			return rj, http.StatusOK
		}
	}

	res := struct {
		UserFound bool `json:"userFound"`
	}{
		false,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK

}

// AuthenticateLogin handles user login request
func AuthenticateLogin(e string, pw string, w http.ResponseWriter) ([]byte, int) {
	var success bool
	var err string
	var statusCode int
	var u User

	existingEmailCount := getCountByEmailAddress(e)

	if existingEmailCount == 0 {
		success = false
		err = "Email and/or password do not match."
		statusCode = http.StatusOK
	} else {
		u = getUserByEmailAddress(e)

		bErr := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(pw))
		if bErr != nil {
			success = false
			err = "Email and/or password do not match."
			u.UID = ""
			u.FirstName = ""
			u.LastName = ""
			u.Password = ""
			statusCode = http.StatusOK
		} else {
			success = true
			statusCode = http.StatusAccepted
			u.Password = ""

			sID, _ := uuid.NewV4()
			c := &http.Cookie{
				Name:  "yaml-session",
				Value: sID.String(),
			}
			http.SetCookie(w, c)
			DbSession[c.Value] = session{u.Email, time.Now()}
		}
	}

	res := struct {
		Success bool   `json:"success"`
		Error   string `json:"error"`
		U       User   `json:"user"`
	}{
		success,
		err,
		u,
	}

	rj, _ := json.Marshal(res)
	return rj, statusCode

}

// InsertNewFromSignUp checks the new user data sent from /signup and
// inserts the user into the db.
func (u User) InsertNewFromSignUp() ([]byte, int) {
	existingEmailCount := getCountByEmailAddress(u.Email)

	insertSuccessful := false
	statusCode := http.StatusInternalServerError

	if existingEmailCount == 0 {
		err := u.insertNewUser()

		if err == nil {
			insertSuccessful = true
			statusCode = http.StatusCreated
		}
	}

	res := struct {
		Success bool `json:"success"`
	}{
		insertSuccessful,
	}

	rj, _ := json.Marshal(res)
	return rj, statusCode
}
