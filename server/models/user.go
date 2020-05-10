package models

import (
	"log"
)

type User struct {
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Password  []byte `json:"password"`
}

// CheckUserWithEmailExists checks if a user with provided email e exists.
func CheckUserWithEmailExists(e string) bool {

	var count int16
	err := DB.QueryRow("SELECT COUNT(email) FROM users WHERE email = ?", e).Scan(&count)
	if err != nil {
		log.Panic(err)
		return false
	}

	if count > 0 {
		return true
	}
	return false

}
