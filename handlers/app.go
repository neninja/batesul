package handlers

import (
	"batesul/resources/views"
	"log"
	"net/http"
	"text/template"
	"time"
)

func App(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFS(views.FS, "index.html")
	if err != nil {
		log.Fatal("Error loading template", err)
	}

	t.Execute(w, map[interface{}]interface{}{
		"Version": time.Now().Unix(),
	})
}
