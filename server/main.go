package main

import (
	"net/http"

	"github.com/briandhkim/community/server/controllers"
	"github.com/julienschmidt/httprouter"
)

func main() {
	r := httprouter.New()

	uc := controllers.NewUserController()

	r.GET("/check-duplicate-email/:email", uc.CheckDuplicateEmail)
	r.POST("/signup", uc.SignUp)

	http.ListenAndServe(":8080", r)

}
