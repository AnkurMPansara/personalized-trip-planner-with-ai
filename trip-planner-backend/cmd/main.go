package main

import (
	"fmt"
	"net/http"
	"trip-planner-backend/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Starting the server...")
	loadEnvErr := godotenv.Load()
	if loadEnvErr != nil {
		fmt.Println("Some error in loading env file: " + loadEnvErr.Error())
	}
	port := "8080"
	ginEngine := gin.New()

	gin.SetMode(gin.ReleaseMode)

	// Add CORS middleware with more permissive settings for development
	ginEngine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allow all origins for development
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false, // Set to false when using wildcard origins
	}))

	handler.RouteRequests(ginEngine)
	server := &http.Server{
		Addr:    ":" + port,
		Handler: ginEngine,
	}

	if serverErr := server.ListenAndServe(); serverErr != nil {
		fmt.Println("Some issue occured while initiating the server: " + serverErr.Error())
	}
}
