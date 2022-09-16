package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"strconv"

	"github.com/thoas/go-funk"

	cors "github.com/itsjamie/gin-cors"
)

type Puppy struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Breed string `json:"breed"`
	Dob   string `json:"dob"`
}

var puppies = []Puppy{
	{ID: 1, Name: "Blue Train", Breed: "Terrier", Dob: "2022/10/1"},
	{ID: 2, Name: "Jeru", Breed: "Afghan Hound", Dob: "2010/2/9"},
	{ID: 3, Name: "Sara", Breed: "Shephard", Dob: "2020/4/13"},
}

func getPuppies(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, puppies)
}

func getOnePup(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	p := funk.Find(puppies, func(puppy Puppy) bool {
		return puppy.ID == id
	})
	if p != nil {
		c.IndentedJSON(http.StatusOK, p)
		return
	}

	// for _, p := range puppies {
	// 	if p.ID == id {
	// 		c.IndentedJSON(http.StatusOK, p)
	// 		return
	// 	}
	// }
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "pup not found"})
}

// postAlbums adds an album from JSON received in the request body.
func postOne(c *gin.Context) {
	var puppy Puppy

	// Call BindJSON to bind the received JSON to
	// puppy.
	if err := c.BindJSON(&puppy); err != nil {
		return
	}

	// declaring maximum of IDs and posting one and changing the new ID
	max := 0
	for _, p := range puppies {
		if max < p.ID {
			max = p.ID
		}
	}

	puppy.ID = max + 1

	// Add the new album to the slice.
	puppies = append(puppies, puppy)
	c.IndentedJSON(http.StatusCreated, puppy)
}

func putOne(c *gin.Context) {
	var puppy Puppy
	id, _ := strconv.Atoi(c.Param("id"))

	if err := c.BindJSON(&puppy); err != nil {
		return
	}

	// var puppyIndex int = -1
	// for i, p := range puppies {
	// 	if p.ID == id {
	// 		puppyIndex = i
	// 	}
	// }

	index := funk.IndexOf(puppies, func(puppy Puppy) bool {
		return puppy.ID == id
	})

	if index == -1 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "puppy wasn't found!"})
		return
	}

	puppies[index].Name = puppy.Name
	puppies[index].Breed = puppy.Breed
	puppies[index].Dob = puppy.Dob

	c.IndentedJSON(http.StatusCreated, puppies[index])
}

func RemoveIndex(s []Puppy, index int) []Puppy {
	ret := make([]Puppy, 0)
	ret = append(ret, s[:index]...)
	return append(ret, s[index+1:]...)
}

func deleteOne(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	var puppyIndex int = -1
	for i, p := range puppies {
		if p.ID == id {
			puppyIndex = i
		}
	}

	if puppyIndex == -1 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "puppy wasn't found!"})
		return
	}

	puppies = RemoveIndex(puppies, puppyIndex)

	c.IndentedJSON(200, gin.H{"message": "Deleted"})
}

func main() {
	router := gin.Default()
	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE, OPTIONS",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     false,
		ValidateHeaders: false,
	}))
	router.GET("/api/puppies", getPuppies)
	router.GET("/api/puppies/:id", getOnePup)
	router.POST("/api/puppies", postOne)
	router.PUT("/api/puppies/:id", putOne)
	router.DELETE("/api/puppies/:id", deleteOne)
	router.Run("localhost:4000")
}

// * go mod init example.com/web-service-gin

// * go get .

// * go run .
