package controllers

import "net/http"

func outputBadRequestError(w http.ResponseWriter) {
	http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
}
