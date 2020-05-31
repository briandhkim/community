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
	sc := controllers.NewSocialController()

	r.GET("/user/check-duplicate-email/:email", uc.CheckDuplicateEmail)
	r.GET("/user/get-logged-in-user", uc.CheckAndGetLoggedInUser)
	r.POST("/user/signup", uc.SignUp)
	r.POST("/user/login", uc.Login)
	r.POST("/user/logout", uc.LogOut)

	r.POST("/friends/load-friends", fc.LoadFriendsByUserUID)
	r.POST("/friends/load-friend-request-data", fc.LoadFriendRequestDataByUserUID)
	r.POST("/friends/send-request", fc.SendFriendRequest)
	r.POST("/friends/reject-request", fc.RejectFriendRequest)
	r.POST("/search-people", sc.SearchPeopleByNameOrEmail)

	http.ListenAndServe(":8080", r)

}
