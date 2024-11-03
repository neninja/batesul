package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	router := chi.NewMux()

	router.Get("/", handleApp)
	// slog.Info("Access")
	http.ListenAndServe(":3000", router)
}

func handleApp(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("foo"))
}
