package models

import (
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  []byte `json:"password"`
}

func getCountByEmailAddress(e string) int16 {
	var count int16
	err := DB.QueryRow("SELECT COUNT(email) FROM users WHERE email = ?", e).Scan(&count)
	if err != nil {
		log.Panic(err)
	}

	return count
}

func (u User) insertNewUser() error {
	sql := "INSERT INTO users(email, firstName, lastName, password) VALUES (?, ?, ?, ?)"
	stmt, _ := DB.Prepare(sql)

	_, err := stmt.Exec(u.Email, u.FirstName, u.LastName, string(u.Password))

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
