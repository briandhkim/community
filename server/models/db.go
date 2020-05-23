package models

import (
	"database/sql"
	// Needed for initializing db connection
	_ "github.com/go-sql-driver/mysql"
	"log"
)

// DB type is used to establish db connection
var DB *sql.DB
var err error

// InitDB initializes database connection pool in a global variable.
// Reference https://www.alexedwards.net/blog/organising-database-access
func InitDB(dbSourceName string) {
	DB, err = sql.Open("mysql", dbSourceName)
	if err != nil {
		log.Panic(err)
	}
	if err = DB.Ping(); err != nil {
		log.Panic(err)
	}
}
