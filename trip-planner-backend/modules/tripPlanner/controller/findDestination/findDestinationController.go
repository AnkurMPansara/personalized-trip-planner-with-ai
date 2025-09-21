package findDestinationController

import (
	"net/http"
	findDestinationModel "trip-planner-backend/modules/tripPlanner/model/findDestination"

	"github.com/gin-gonic/gin"
)

func FindDestination(ginCtx *gin.Context) {
	apiInputParam, bindErr := BindInputParams(ginCtx)
	apiResponse := findDestinationModel.ApiResponse{}
	defer func() {
		findDestinationModel.CreateApplicationLogs(ginCtx, apiInputParam, apiResponse)
	}()

	if bindErr != nil {
		apiResponse.Code = http.StatusBadRequest
		apiResponse.Status = "Failure"
		apiResponse.Error = bindErr.Error()
		ReturnApiResponse(ginCtx, http.StatusBadRequest, apiResponse)
		return
	}

	userQuery := findDestinationModel.GenerateUserQuery(apiInputParam)
	resp, respErr := findDestinationModel.GenerateDestinationSuggestion(ginCtx, userQuery)
	if respErr != nil {
		apiResponse.Code = http.StatusInternalServerError
		apiResponse.Status = "Success"
		apiResponse.Error = respErr.Error()
		ReturnApiResponse(ginCtx, http.StatusBadRequest, apiResponse)
		return
	}
	findDestinationModel.EnrichDestinationImages(&resp)
	apiResponse.Code = http.StatusOK
	apiResponse.Status = "Success"
	apiResponse.Response = resp
	ReturnApiResponse(ginCtx, http.StatusOK, apiResponse)
}

func BindInputParams(ginCtx *gin.Context) (InputParams findDestinationModel.ApiInputParams, err error) {
	bindErr := ginCtx.ShouldBindBodyWithJSON(&InputParams)
	return InputParams, bindErr
}

func ReturnApiResponse(ginCtx *gin.Context, apiCode int, apiResponse findDestinationModel.ApiResponse) {
	ginCtx.JSON(apiCode, apiResponse)
}
