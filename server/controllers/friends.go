package controllers

import (
	"encoding/json"
	"fmt"
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

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(statusCode)
		fmt.Fprintf(w, "%s\n", rj)

	} else {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}
