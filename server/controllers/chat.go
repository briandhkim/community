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
