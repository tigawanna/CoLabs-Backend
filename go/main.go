package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
)


type User struct {
	Name string `json:"name"`
}

var userCache = make(map[int]User)
var cacheMutex sync.RWMutex

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})
	// get all users
	mux.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		cacheMutex.RLock()
		defer cacheMutex.RUnlock()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(userCache)
	})
	// get one user
	mux.HandleFunc("/users/{id}", getUser)
	mux.HandleFunc("POST /users", createUser)
	log.Print("Starting server on http://127.0.0.1:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}



func getUser(w http.ResponseWriter, r *http.Request) {
		id,err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		cacheMutex.RLock()
		defer cacheMutex.RUnlock()

		user,ok := userCache[id]
		if !ok {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		userjson,err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(userjson)
		w.WriteHeader(http.StatusOK)
	}

func createUser(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if(user.Name == ""){
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}
	cacheMutex.Lock()
	defer cacheMutex.Unlock()
	userCache[len(userCache)+1] = user
	w.WriteHeader(http.StatusNoContent)
}
