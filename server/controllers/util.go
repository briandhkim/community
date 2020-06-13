package controllers

import (
	"fmt"
	"net/http"
)

// outputJSONResponse takes json data and a statuscode and outputs the data
// as json response for the controller
func outputJSONResponse(w http.ResponseWriter, j []byte, s int) {
	//Write content-type, statuscode, and payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(s)
	fmt.Fprintf(w, "%s\n", j)
}

// outputBadRequestError sends back 500 error response to bad requests
func outputBadRequestError(w http.ResponseWriter) {
	http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
}

func outputInternalServerError(w http.ResponseWriter) {
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}