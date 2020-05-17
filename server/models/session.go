package models

import (
	"net/http"
	"time"
)

type session struct {
	value        string
	lastActivity time.Time
}

//DbSession holds session data
var DbSession = map[string]session{}

// DbSessionsCleaned will be used later to track session timeout
var DbSessionsCleaned time.Time

// UserIsLoggedIn checks cookie and session data to see if the user is logged in
func UserIsLoggedIn(r *http.Request) bool {

	c, err := r.Cookie("yaml-session")
	if err != nil {
		return false
	}

	uEmail := DbSession[c.Value].value
	uCountByEmail := getCountByEmailAddress(uEmail)

	if uCountByEmail == 0 {
		return false
	}

	return true
}

// GetUserEmailFromSession returns user's email address from session data
func GetUserEmailFromSession(r *http.Request) (string, error) {
	c, err := r.Cookie("yaml-session")
	if err != nil {
		return "", err
	}

	uEmail := DbSession[c.Value].value

	return uEmail, err
}

// DeleteUserSessionState handles removing user login state from session and cookie
func DeleteUserSessionState(w http.ResponseWriter, r *http.Request) error {

	c, err := r.Cookie("yaml-session")
	if err != nil {
		return err
	}

	//delete the session data
	delete(DbSession, c.Value)

	//delete cookie
	c = &http.Cookie{
		Name:   "yaml-session",
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, c)

	return err
}
