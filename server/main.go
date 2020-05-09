package main

import (
	"net/http"

	"github.com/briandhkim/community/server/controllers"
	"github.com/julienschmidt/httprouter"
)

func main() {
	r := httprouter.New()

	uc := controllers.NewUserController()

	r.POST("/signup", uc.SignUp)

	http.ListenAndServe("localhost:8080", r)

}