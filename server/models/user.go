package models

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

// User type contains information about the app user
type User struct {
	Email     string `json:"email"`
	UID       string `json:"uid"`
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

func getUserByID(id int) User {
	var em, uid, fn, ln, pw string

	sql := `SELECT 
				email, uid, firstName, lastName, password 
			from 
				users 
			where 
				id = ?
			and
				date_deleted is null`
	err := DB.QueryRow(sql, id).Scan(&em, &uid, &fn, &ln, &pw)
	if err != nil {
		log.Panic(err)
	}

	u := User{em, uid, fn, ln, pw}

	return u
}

func getUserByUID(id string) User {
	var em, uid, fn, ln, pw string

	sql := `SELECT 
				email, uid, firstName, lastName, password 
			from 
				users 
			where 
				uid = ?
			and
				date_deleted is null`
	err := DB.QueryRow(sql, id).Scan(&em, &uid, &fn, &ln, &pw)
	if err != nil {
		log.Panic(err)
	}

	u := User{em, uid, fn, ln, pw}

	return u
}

func getUserByEmailAddress(e string) User {
	var em, uid, fn, ln, pw string

	sql := `SELECT 
				email, uid, firstName, lastName, password 
			from 
				users 
			where 
				email = ?
			and
				date_deleted is null`

	err := DB.QueryRow(sql, e).Scan(&em, &uid, &fn, &ln, &pw)
	if err != nil {
		log.Panic(err)
	}

	u := User{em, uid, fn, ln, pw}

	return u
}

func getUserSliceByNameOrEmail(sv string) []User {

	v := "%" + sv + "%"

	sql := `select 
				email, uid, firstName, lastName 
			from 
				users 
			where 
				(
					concat(firstname, ' ', lastName) like ? 
					or 
					email like ?
				)
				and date_deleted is null
			order by lastName asc 
			limit 50`

	rows, err := DB.Query(sql, v, v)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	us := make([]User, 0, 50)

	for rows.Next() {
		var em, uid, fn, ln string
		if err := rows.Scan(&em, &uid, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, uid, fn, ln, ""}
		us = append(us, u)
	}

	return us
}

func (u User) insertNewUser() error {

	bs, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.MinCost)
	if err != nil {
		return err
	}

	sql := `INSERT INTO users
				(email, uid, firstName, lastName, password) 
			VALUES 
				(?, ?, ?, ?, ?)`
	stmt, _ := DB.Prepare(sql)
	defer stmt.Close()

	// If duplicate uid has been generated somehow, the loop will try to generate
	// another uid and insert again
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
func GetLoggedInUser(w http.ResponseWriter, r *http.Request) ([]byte, int) {

	if UserIsLoggedIn(w, r) {
		ue, err := getUserEmailFromSession(w, r)

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
				Name:   "yaml-session",
				Value:  sID.String(),
				MaxAge: sessionLength,
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

// LogOut handles user logout request
func LogOut(w http.ResponseWriter, r *http.Request) ([]byte, int) {
	var s bool

	if !UserIsLoggedIn(w, r) {
		s = true
	} else {
		err := deleteUserSessionState(w, r)

		if err != nil {
			s = false
		} else {
			s = true
		}
	}

	res := struct {
		Success bool `json:"success"`
	}{
		s,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
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

// SearchUsersByNameOrEmail looks up users based on name or email
func SearchUsersByNameOrEmail(sv string) ([]byte, int) {

	us := getUserSliceByNameOrEmail(sv)

	res := struct {
		Success bool   `json:"success"`
		Users   []User `json:"users"`
	}{
		true,
		us,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK

}
