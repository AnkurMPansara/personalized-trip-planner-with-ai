package genaiService

import (
	"context"

	"google.golang.org/genai"
)

var genaiClient *genai.Client

func GetClient() (client *genai.Client, err error) {
	if genaiClient != nil {
		client = genaiClient
		return
	}
	clientConfig := genai.ClientConfig{
		APIKey: "AIzaSyC3povMBxgTP6zh_9Nsq7HPTOb2r9SKS2Y",
	}
	client, clientErr := genai.NewClient(context.Background(), &clientConfig)
	if clientErr != nil {
		client = nil
		err = clientErr
		return
	}
	genaiClient = client
	return
}
