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
func (uc UserController) SignUp(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	// check if user is logged in later

	if r.Method == http.MethodPost {
		//ref:
		//https://stackoverflow.com/questions/16512009/how-to-extract-the-post-arguments-in-go-server
		//https://stackoverflow.com/questions/15672556/handling-json-post-request-in-go
		//https://qvault.io/2020/04/21/use-anonymous-structs-for-json-marshalling-in-go/
		//handle post method 1
		// u := models.User{}
		// json.NewDecoder(r.Body).Decode(&u)
		// fmt.Println(u)
		//handle post method 1 end

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		signUpData := struct {
			E  string `json:"email"`
			Fn string `json:"firstName"`
			Ln string `json:"lastName"`
			Pw string `json:"password"`
		}{}
		err := decoder.Decode(&signUpData)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		bs, err := bcrypt.GenerateFromPassword([]byte(signUpData.Pw), bcrypt.MinCost)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		u := models.User{
			Email:     signUpData.E,
			FirstName: signUpData.Fn,
			LastName:  signUpData.Ln,
			Password:  bs,
		}

		res := struct {
			Success  bool        `json:"success"`
			Redirect string      `json:"redirect"`
			User     models.User `json:"user"`
		}{
			true,
			"/",
			u,
		}

		//Marshal user data that has been created to json
		uj, _ := json.Marshal(res)

		//Write content-type, statuscode, and payload
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		fmt.Fprintf(w, "%s\n", uj)
	}
}
