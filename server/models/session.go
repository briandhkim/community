package models

import "time"

type session struct {
	value        string
	lastActivity time.Time
}

//DbSession holds session data
var DbSession = map[string]session{}

// DbSessionsCleaned will be used later to track session timeout
var DbSessionsCleaned time.Time
