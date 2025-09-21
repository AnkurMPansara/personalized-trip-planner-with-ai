package imageMedia

import (
	"net/http"
	"time"
	globalconstant "trip-planner-backend/globalConstant"
	"trip-planner-backend/utilities/httpRequest"
)

func FetchMedia(input string) string {

	imageMediaInput := httpRequest.HttpRequest{}

	imageMediaInput.Method = http.MethodGet

	imageMediaInput.Headers = nil
	imageMediaInput.URL = globalconstant.GOOGLE_IMAGE_API_URL

	imageMediaInput.QueryParams = map[string]any{
		"q":          input,
		"searchType": "image",
		"key":        "AIzaSyAFjvX9oTm9VHTE5CgTTrL_udiceF_1_tw",
		"cx":         globalconstant.GOOGLE_IMAGE_CX_ID,
		"num":        globalconstant.GOOGLE_MAX_IMAGE_LIMIT,
	}

	imageMediaInput.Timeout = 10 * time.Second

	// call api

	imageMediaRes := httpRequest.MakeHttpCall(imageMediaInput)

	if imageMediaRes.Err != nil || imageMediaRes.StatusCode != http.StatusOK {
		return ""
	}

	if item, ok := imageMediaRes.Body["items"].([]any); ok {
		for _, item := range item {
			if img, ok := item.(map[string]any); ok {
				if link, ok := img["link"].(string); ok {
					if CheckValidMedia(link) {
						return link
					}
				}
			}
		}
	}

	return ""
}

func CheckValidMedia(input string) bool {
	inputparamCheckMedia := httpRequest.HttpRequest{}

	inputparamCheckMedia.URL = input
	inputparamCheckMedia.Method = http.MethodHead // faster then the normal get

	inputparamCheckMedia.Timeout = 10 * time.Second

	resp := httpRequest.MakeHttpCall(inputparamCheckMedia)

	if resp.Err != nil {
		return false
	}
	return resp.StatusCode >= 200 && resp.StatusCode < 400
	//A URL is considered "working" if status is 2xx or 3xx
}
