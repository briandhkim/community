package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/bcrypt"
)

// UserController handles http requests made that target CRUD actions for User type
type UserController struct{}

// NewUserController returns a pointer to a new UserController type
func NewUserController() *UserController {
	return &UserController{}
}

// SignUp handles the POST request made to /signup endpoint. 
func (uc UserController) SignUp(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	// check if user is logged in later

	if r.Method == http.MethodPost {
		pw := p.ByName("password")
		bs, err := bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)

		if err != nil {
			//change this later to return error in json format
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		u := models.User{
			Email : p.ByName("email"),
			FirstName : p.ByName("firstName"),
			LastName: p.ByName("lastName"),
			Password: bs,
		}

		//Marshal user data that has been created to json
		uj, _ := json.Marshal(u)

		//Write content-type, statuscode, and payload
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		fmt.Fprintf(w, "%s\n", uj)
	}
}