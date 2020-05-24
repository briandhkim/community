package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
)

// SocialController handles http requests made that target CRUD actions for social features
type SocialController struct{}

// NewSocialController returns a pointer to a new SocialController type
func NewSocialController() *SocialController {
	return &SocialController{}
}

// SearchPeopleByNameOrEmail handles the POST request made to /search-people endpoint
func (sc SocialController) SearchPeopleByNameOrEmail(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
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
