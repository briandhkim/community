package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
)

// FriendsController handles http requests made that target CRUD actions for Friends type & functionality
type FriendsController struct{}

// NewFriendsController returns a pointer to a new FriendsController type
func NewFriendsController() *FriendsController {
	return &FriendsController{}
}

// LoadFriendsByUserUID handles the POST request made to /friends/load-friends
func (fc FriendsController) LoadFriendsByUserUID(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			UID string `json:"uid"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		rj, statusCode := models.LoadFriendsByUID(d.UID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// SearchPeopleByNameOrEmail handles the POST request made to /search-people endpoint
func (fc FriendsController) SearchPeopleByNameOrEmail(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			Sv string `json:"searchValue"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		rj, statusCode := models.SearchUsersByNameOrEmail(d.Sv)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}
