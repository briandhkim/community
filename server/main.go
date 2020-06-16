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
	cc := controllers.NewChatController()

	r.GET("/user/check-duplicate-email/:email", uc.CheckDuplicateEmail)
	r.GET("/user/get-logged-in-user", uc.CheckAndGetLoggedInUser)
	r.POST("/user/signup", uc.SignUp)
	r.POST("/user/login", uc.Login)
	r.POST("/user/logout", uc.LogOut)

	r.POST("/friends/load-friends", fc.LoadFriendsByUserUID)
	r.POST("/friends/load-friend-request-data", fc.LoadFriendRequestDataByUserUID)
	r.POST("/friends/send-request", fc.SendFriendRequest)
	r.POST("/friends/accept-request", fc.AcceptFriendRequest)
	r.POST("/friends/reject-request", fc.RejectFriendRequest)
	r.POST("/search-people", sc.SearchPeopleByNameOrEmail)

	r.POST("/chat/load-chat-data", cc.LoadChatDataByChatUID)
	r.POST("/chat/load-dm-data", cc.LoadDirectMessageDataByUserUID)
	r.POST("/chat/insert-new-message", cc.InsertNewMessage)

	// sz := "1bda56a3-3efb-4f2f-96fc-2a702e530c4f"
	// am := "65e236ac-a64e-439a-8620-0adcd2fe5929"
	// ls := "d76f73c3-0ea2-4afa-b009-794f1164910a"
	// rh := "1e0c1b57-303a-407a-8c59-0b79e70c1ccc"

	// models.LoadDMDataByUserUIDs(sz, am)

	http.ListenAndServe(":8080", r)

}
