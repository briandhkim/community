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
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.GetFriendsByUserUID(d.UID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// LoadFriendRequestDataByUserUID handles the POST request made to /friends/load-friend-request-data
func (fc FriendsController) LoadFriendRequestDataByUserUID(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			UID string `json:"uid"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.GetFriendRequestDataByUserUID(d.UID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// SendFriendRequest handles the POST request made to /friends/send-request
func (fc FriendsController) SendFriendRequest(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			FUID string `json:"fromUserUID"`
			TUID string `json:"toUserUID"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.SendFriendRequest(d.FUID, d.TUID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// AcceptFriendRequest handles the POST request made to /friends/accept-request
func (fc FriendsController) AcceptFriendRequest(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			FUID string `json:"fromUserUID"`
			TUID string `json:"toUserUID"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.AcceptFriendRequest(d.FUID, d.TUID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// RejectFriendRequest handles the POST request made to /friends/reject-request
func (fc FriendsController) RejectFriendRequest(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			FUID string `json:"fromUserUID"`
			TUID string `json:"toUserUID"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.RejectFriendRequest(d.FUID, d.TUID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}
