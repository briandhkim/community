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

//seconds - setting it to 24 hours
const sessionLength int = 86400

//12 hours
const sessionCleanInterval int = 43200

// UserIsLoggedIn checks cookie and session data to see if the user is logged in
func UserIsLoggedIn(w http.ResponseWriter, r *http.Request) bool {

	c, err := r.Cookie("yaml-session")
	if err != nil {
		return false
	}

	uEmail := DbSession[c.Value].value
	uCountByEmail := getCountByEmailAddress(uEmail)

	//refresh session
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	if uCountByEmail == 0 {
		return false
	}

	return true
}

// GetUserEmailFromSession returns user's email address from session data
func getUserEmailFromSession(w http.ResponseWriter, r *http.Request) (string, error) {
	c, err := r.Cookie("yaml-session")
	if err != nil {
		return "", err
	}

	//refresh session
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	uEmail := DbSession[c.Value].value

	return uEmail, err
}

// DeleteUserSessionState handles removing user login state from session and cookie
func deleteUserSessionState(w http.ResponseWriter, r *http.Request) error {

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

	if time.Now().Sub(DbSessionsCleaned) > (time.Second * time.Duration(sessionCleanInterval)) {
		go cleanSessions()
	}

	return err
}

func cleanSessions() {
	for k, v := range DbSession {
		if time.Now().Sub(v.lastActivity) > (time.Second*time.Duration(sessionCleanInterval)) || v.value == "" {
			delete(DbSession, k)
		}
	}

	DbSessionsCleaned = time.Now()
}
