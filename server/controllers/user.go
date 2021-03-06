package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
)

// UserController handles http requests made that target CRUD actions for User type
type UserController struct{}

// NewUserController returns a pointer to a new UserController type
func NewUserController() *UserController {
	return &UserController{}
}

// CheckDuplicateEmail checks to see if there is an existing user with a given email.
// Mainly used for the Sign Up page
func (uc UserController) CheckDuplicateEmail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Method == http.MethodGet {

		rj, statusCode := models.CheckUserWithEmailExists(ps.ByName("email"))

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// CheckAndGetLoggedInUser checks cookie/session data for record of logged in users and returns a user if available
func (uc UserController) CheckAndGetLoggedInUser(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodGet {

		rj, statusCode := models.GetLoggedInUser(w, r)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
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
			outputInternalServerError(w)
			return
		}

		u := models.User{
			Email:     signUpData.E,
			FirstName: signUpData.Fn,
			LastName:  signUpData.Ln,
			Password:  signUpData.Pw,
		}

		rj, statusCode := u.InsertNewFromSignUp()

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// Login handles the POST request made to /login endpoint
func (uc UserController) Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		loginData := struct {
			E  string `json:"email"`
			Pw string `json:"password"`
		}{}
		err := decoder.Decode(&loginData)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.AuthenticateLogin(loginData.E, loginData.Pw, w)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// LogOut handles the POST request made to /logout endpoint
func (uc UserController) LogOut(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		rj, statusCode := models.LogOut(w, r)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}
