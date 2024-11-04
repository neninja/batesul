package main

import (
	"batesul/handlers"
	"batesul/public"
	"log"
	"log/slog"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	listenAddr := ":3000"
	if err := godotenv.Load(); err == nil {
		listenAddr = os.Getenv("LISTEN_ADDR")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /", handlers.App)
	mux.Handle("GET /public/assets/", http.StripPrefix("/public/", http.FileServer(http.FS(public.FS))))

	slog.Info("HTTP server startedd", "listenAddr", listenAddr)
	err := http.ListenAndServe(listenAddr, mux)
	log.Fatal(err)
}
