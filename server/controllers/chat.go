package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/briandhkim/community/server/models"
	"github.com/julienschmidt/httprouter"
)

// ChatController handles http requests made that target CRUD actions for Chat type & functionality
type ChatController struct{}

// NewChatController returns a pointer to a new ChatController type
func NewChatController() *ChatController {
	return &ChatController{}
}

// LoadChatDataByChatUID handles the post request made to /chat/load-chat-data
func (cc ChatController) LoadChatDataByChatUID(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			UID string `json:"chat_uid"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.LoadChatDataByChatUID(d.UID)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// LoadDirectMessageDataByUserUID handles the post request made to /chat/load-dm-data
func (cc ChatController) LoadDirectMessageDataByUserUID(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			UIDa string `json:"uid_a"`
			UIDb string `json:"uid_b"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.LoadDMDataByUserUIDs(d.UIDa, d.UIDb)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// InsertNewMessage handles the post request made to /chat/insert-new-message
func (cc ChatController) InsertNewMessage(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method == http.MethodPost {

		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		d := struct {
			C string `json:"chat_uid"`
			U string `json:"user_uid"`
			M string `json:"message"`
		}{}
		err := decoder.Decode(&d)
		if err != nil {
			outputInternalServerError(w)
			return
		}

		rj, statusCode := models.InsertNewChatMessage(d.C, d.U, d.M)

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}

// GetListChatByUserUID handles the get request made to /chat/available-chat-list
func (cc ChatController) GetListChatByUserUID(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	if r.Method == http.MethodGet {

		rj, statusCode := models.LoadAllChatByUserUID(ps.ByName("uid"))

		outputJSONResponse(w, rj, statusCode)

	} else {
		outputBadRequestError(w)
	}
}
