package handlers

import (
	"batesul/public"
	"batesul/resources/views"
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"text/template"
)

type ManifestEntry struct {
	File    string   `json:"file"`
	Css     []string `json:"css"`
	IsEntry bool     `json:"isEntry"`
}

var (
	manifest     map[string]ManifestEntry
	manifestOnce sync.Once
)

func loadManifest() {
	data, err := public.FS.ReadFile("assets/.vite/manifest.json")
	if err != nil {
		log.Fatalf("Error reading manifest file: %v", err)
	}

	if err := json.Unmarshal(data, &manifest); err != nil {
		log.Fatalf("Error parsing manifest file: %v", err)
	}
}

func ViteFile(filename string) string {
	manifestOnce.Do(loadManifest)
	if entry, exists := manifest[filename]; exists {
		return entry.File
	}
	return ""
}

func ViteCss(filename string) string {
	manifestOnce.Do(loadManifest)
	if entry, exists := manifest[filename]; exists && len(entry.Css) > 0 {
		return entry.Css[0]
	}
	return ""
}

func App(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFS(views.FS, "index.html")
	if err != nil {
		log.Fatal("Error loading template", err)
	}

	t.Execute(w, map[interface{}]interface{}{
		"Script": ViteFile("resources/js/bootstrap.js"),
		"Style":  ViteCss("resources/js/bootstrap.js"),
	})
}
