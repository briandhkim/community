package main

import (
	"net/http"

	"github.com/briandhkim/community/server/controllers"
	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
)

func main() {
	models.InitDB("root:password@tcp(localhost:3306)/yaml_main?charset=utf8")
	defer models.DB.Close()

	r := httprouter.New()

	uc := controllers.NewUserController()

	r.GET("/check-duplicate-email/:email", uc.CheckDuplicateEmail)
	r.GET("/get-logged-in-user", uc.CheckAndGetLoggedInUser)
	r.POST("/signup", uc.SignUp)
	r.POST("/login", uc.Login)

	http.ListenAndServe(":8080", r)

}
