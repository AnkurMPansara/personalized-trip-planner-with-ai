package findDestinationModel

import (
	"encoding/json"
	"fmt"
	"strings"
	globalconstant "trip-planner-backend/globalConstant"
	"trip-planner-backend/utilities/genaiService"
	"trip-planner-backend/utilities/globalFunctions"
	"trip-planner-backend/utilities/imageMedia"

	"github.com/gin-gonic/gin"
	"google.golang.org/genai"
)

type ApiInputParams struct {
	UserId                int    `json:"user_id" binding:"required"`
	UserLocation          string `json:"user_location"`
	IsInternationalTravel bool   `json:"is_international_travel"`
	TravelDays            int    `json:"travel_days"`
	TravelDateTime        string `json:"travel_date_time"`
	TravelingMethod       string `json:"traveling_method"`
	TripNature            string `json:"trip_nature"`
	PersonCount           int    `json:"person_count"`
	GroupDemographic      string `json:"group_demographic"`
	Budget                string `json:"budget"`
	CustomRequirement     string `json:"custom_requirement"`
	PreferredLocation     string `json:"preferred_location"`
}

type GeneratedDestination struct {
	Place       string `json:"place"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Cost        string `json:"cost"`
}

type ContentGenerationResponse struct {
	Locations []GeneratedDestination `json:"locations"`
}

type ApiResponse struct {
	Code     int                       `json:"code"`
	Status   string                    `json:"status"`
	Error    string                    `json:"error"`
	Response ContentGenerationResponse `json:"response"`
}

func GetSystemQuery() string {
	var b strings.Builder

	b.WriteString("You are a travel recommendation assistant.\n")
	b.WriteString("Your task is to generate suitable international trip locations tailored to the provided user inputs.\n")
	b.WriteString("- Always consider explicit preferences: preferred location type, nature of trip, group type, custom requirements, budget.\n")
	b.WriteString("- Check real-time travel conditions (weather forecasts, official advisories, major local events, transport disruptions, health alerts, natural-disaster warnings). Any location considered harmful to user should be excluded from the suggestion\n")
	exampleFormat := &ContentGenerationResponse{
		Locations: []GeneratedDestination{
			{
				Place:       "Name of the place",
				Image:       "public Image url of the suggested location",
				Description: "Short description of suggested location",
				Cost:        "Expected cost of the trip",
			},
		},
	}
	exampleFormatBytes, _ := json.Marshal(exampleFormat)
	exampleFormatString := string(exampleFormatBytes)
	b.WriteString("- Response should be strictly in below JSON format: ```json\n" + exampleFormatString + "```\n")
	b.WriteString("- Retunrning JSON response should contain atleast one location suggestion and atmost five suggestions, but it should aim for close to five suggestions of possible")
	b.WriteString("- place name should be consice and must be most commnly used name for that place.\n")
	b.WriteString("- image of the location must have 16:9 aspect ratio and it must be sourced **only** from publicly accessible and free platforms: Unsplash, Pexels, Pixabay, or Wikimedia Commons, with minimum 1600x900 resolution.\n")
	b.WriteString("- Never invent or hallucinate image URLs.\n")
	b.WriteString("- Location description should be one sententce summary of the place with highlighting attraction of the location as tourism place.\n")
	b.WriteString("- Cost should be approximate cost of the travel with reasonable assumptions that includes hotel costs, travel costs and other trip related cost")
	return b.String()
}

func GenerateUserQuery(apiInputParams ApiInputParams) string {
	var b strings.Builder

	b.WriteString("Given the user inputs below, suggest suitable trip locations tailored to their preferences and constraints.\n\n")
	b.WriteString("User inputs:\n")

	if apiInputParams.UserLocation == "" {
		apiInputParams.UserLocation = "India"
	}
	b.WriteString(fmt.Sprintf("- User is located in %s\n", apiInputParams.UserLocation))

	// Travel type (include explicit yes/no for clarity)
	if apiInputParams.IsInternationalTravel {
		b.WriteString("- International travel: yes\n")
	} else {
		b.WriteString("- International travel: no (domestic)\n")
	}

	// Add other fields only when they are non-zero / non-empty
	if apiInputParams.TravelDays > 0 {
		b.WriteString(fmt.Sprintf("- Travel duration (days): %d\n", apiInputParams.TravelDays))
	}
	if strings.TrimSpace(apiInputParams.TravelDateTime) != "" {
		b.WriteString(fmt.Sprintf("- Travel dates / time: %s\n", strings.TrimSpace(apiInputParams.TravelDateTime)))
	}
	if strings.TrimSpace(apiInputParams.TravelingMethod) != "" {
		b.WriteString(fmt.Sprintf("- Preferred traveling method: %s\n", strings.TrimSpace(apiInputParams.TravelingMethod)))
	}
	if strings.TrimSpace(apiInputParams.TripNature) != "" {
		b.WriteString(fmt.Sprintf("- Trip nature: %s\n", strings.TrimSpace(apiInputParams.TripNature)))
	}
	if apiInputParams.PersonCount > 0 {
		b.WriteString(fmt.Sprintf("- Number of travelers: %d\n", apiInputParams.PersonCount))
	}
	if strings.TrimSpace(apiInputParams.GroupDemographic) != "" {
		b.WriteString(fmt.Sprintf("- Group demographic: %s\n", strings.TrimSpace(apiInputParams.GroupDemographic)))
	}
	if strings.TrimSpace(apiInputParams.Budget) != "" {
		b.WriteString(fmt.Sprintf("- Budget preference: %s\n", strings.TrimSpace(apiInputParams.Budget)))
	}
	if strings.TrimSpace(apiInputParams.CustomRequirement) != "" {
		b.WriteString(fmt.Sprintf("- Custom requirements / constraints: %s\n", strings.TrimSpace(apiInputParams.CustomRequirement)))
	}
	if strings.TrimSpace(apiInputParams.PreferredLocation) != "" {
		b.WriteString(fmt.Sprintf("- Preferred location / region: %s\n", strings.TrimSpace(apiInputParams.PreferredLocation)))
	}

	// Core instruction (focused, no response-format specifics)
	b.WriteString("\nInstructions:\n")
	b.WriteString("- Using the inputs above, suggest suitable trip locations tailored to these preferences.\n")
	b.WriteString("- Explicitly consider real-time conditions for the travel dates (current and forecast weather, official travel advisories, major local events, transport disruptions/strikes, health alerts, and natural-disaster warnings).\n")
	b.WriteString("- Flag any location with significant risk or likely major inconvenience, and give a brief reason for the flag.\n")
	b.WriteString("- Prioritize explicit user preferences (preferred_location, trip_nature, group_demographic, custom_requirement, budget) when recommending.\n")
	b.WriteString("- Provide concise rationale for each suggested location; do not add unnecessary preamble. (Output formatting will be specified separately.)\n")

	return b.String()
}

func GenerateDestinationSuggestion(ginCtx *gin.Context, userQuery string) (result ContentGenerationResponse, err error) {
	client, clientErr := genaiService.GetClient()
	if clientErr != nil {
		err = clientErr
		return
	}

	model := globalconstant.GEMINI_MODEL
	if isModelAvailableErr := genaiService.IsModelAvailable(ginCtx, client, model); isModelAvailableErr != nil {
		err = isModelAvailableErr
		return
	}
	contents := []*genai.Content{
		{
			Role: "model",
			Parts: []*genai.Part{
				{
					Text: GetSystemQuery(),
				},
			},
		},
		{
			Role: "user",
			Parts: []*genai.Part{
				{
					Text: userQuery,
				},
			},
		},
	}
	contentGenerateConfig := genai.GenerateContentConfig{
		ResponseMIMEType: "text/plain",
		ResponseSchema: &genai.Schema{
			Type: genai.TypeObject,
			Properties: map[string]*genai.Schema{
				"locations": {
					Type: genai.TypeArray,
					Items: &genai.Schema{
						Type: genai.TypeObject,
						Properties: map[string]*genai.Schema{
							"place": {
								Type: genai.TypeString,
							},
							"image": {
								Type: genai.TypeString,
							},
							"description": {
								Type: genai.TypeString,
							},
							"cost": {
								Type: genai.TypeString,
							},
						},
						Required: []string{"place", "image", "description", "cost"},
					},
				},
			},
			Required: []string{"locations"},
		},
		Tools: []*genai.Tool{
			{
				GoogleSearch: &genai.GoogleSearch{},
			},
		},
	}
	modelResponse, respErr := client.Models.GenerateContent(ginCtx, model, contents, &contentGenerateConfig)
	if respErr != nil {
		err = respErr
		return
	}
	rawResponse, _ := globalFunctions.ExtractJson(modelResponse.Text())
	if unmarshalErr := json.Unmarshal([]byte(rawResponse), &result); unmarshalErr != nil {
		err = unmarshalErr
		return
	}
	return
}

func EnrichDestinationImages(generatedContent *ContentGenerationResponse) {
	for index, dest := range generatedContent.Locations {
		if !imageMedia.CheckValidMedia(dest.Image) {
			generatedContent.Locations[index].Image = imageMedia.FetchMedia(dest.Place)
		}
	}
}

func CreateApplicationLogs(ginCtx *gin.Context, apiInputParams ApiInputParams, apiResponse ApiResponse) {

	fileName := "find_destination"

	logData := map[string]any{}
	logData["user_id"] = globalFunctions.ConvertValueToString(apiInputParams.UserId)
	logData["is_international_travel"] = globalFunctions.ConvertValueToString(apiInputParams.IsInternationalTravel)
	logData["travel_days"] = globalFunctions.ConvertValueToString(apiInputParams.TravelDays)
	logData["travel_date_time"] = globalFunctions.ConvertValueToString(apiInputParams.TravelDateTime)
	logData["traveling_method"] = globalFunctions.ConvertValueToString(apiInputParams.TravelingMethod)
	logData["trip_nature"] = globalFunctions.ConvertValueToString(apiInputParams.TripNature)
	logData["person_count"] = globalFunctions.ConvertValueToString(apiInputParams.PersonCount)
	logData["group_demographic"] = globalFunctions.ConvertValueToString(apiInputParams.GroupDemographic)
	logData["budget"] = globalFunctions.ConvertValueToString(apiInputParams.Budget)
	logData["custom_requirement"] = globalFunctions.ConvertValueToString(apiInputParams.CustomRequirement)
	logData["preferred_location"] = globalFunctions.ConvertValueToString(apiInputParams.PreferredLocation)

	logData["code"] = globalFunctions.ConvertValueToString(apiResponse.Code)
	logData["status"] = globalFunctions.ConvertValueToString(apiResponse.Status)
	logData["response"] = globalFunctions.ConvertJsonValToString(apiResponse.Response)

	globalFunctions.WriteJsonLogs(ginCtx, fileName, logData)
}
