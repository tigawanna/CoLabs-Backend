package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})
	print("Listening on http://127.0.0.1:8080 ")
	http.ListenAndServe(":8080", nil)
}
