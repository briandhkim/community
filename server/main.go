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
	fc := controllers.NewFriendsController()

	r.GET("/user/check-duplicate-email/:email", uc.CheckDuplicateEmail)
	r.GET("/user/get-logged-in-user", uc.CheckAndGetLoggedInUser)
	r.POST("/user/signup", uc.SignUp)
	r.POST("/user/login", uc.Login)
	r.POST("/user/logout", uc.LogOut)

	r.POST("/search-people", fc.SearchPeopleByNameOrEmail)

	http.ListenAndServe(":8080", r)

}
