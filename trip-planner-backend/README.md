<a name="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Trip Planner Backend API</h3>

  <p align="center">
    RESTful API server built with Go and Gin framework, powered by Google Gemini AI for intelligent travel planning
    <br />
    <a href="https://github.com/your_username/personalized-trip-planner-with-ai"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/your_username/personalized-trip-planner-with-ai/issues">Report Bug</a>
    ·
    <a href="https://github.com/your_username/personalized-trip-planner-with-ai/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The Trip Planner Backend is a high-performance REST API built with Go and the Gin web framework. It integrates with Google Gemini AI (gemini-2.5-flash) to provide intelligent travel destination suggestions and detailed itinerary generation. The backend uses Google Search integration to ensure recommendations consider real-time travel conditions, weather forecasts, and safety advisories.

### Key Features

* **AI-Powered Recommendations**: Uses Google Gemini AI with Google Search integration for intelligent travel suggestions
* **Real-Time Travel Intelligence**: Considers weather, advisories, events, and safety conditions
* **Image Enrichment**: Automatic image validation and fallback system for destination images
* **Structured JSON Responses**: Uses AI schema validation for consistent API responses
* **Centralized Logging**: Comprehensive logging system for all API requests and responses
* **CORS Support**: Configured for cross-origin requests from frontend applications

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Go][Go]][Go-url] - Programming language
* [![Gin][Gin]][Gin-url] - Web framework
* [![Google Gemini AI][Gemini]][Gemini-url] - AI model for travel recommendations
* [![godotenv][godotenv]][godotenv-url] - Environment variable management

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* **Go** (v1.23 or higher)
  ```sh
  # Download from https://go.dev/dl/
  # Verify installation
  go version
  ```
* **Google Gemini API Key**
  - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. Navigate to the backend directory
   ```sh
   cd trip-planner-backend
   ```

2. Install dependencies
   ```sh
   go mod download
   ```

3. Create a `.env` file in the backend root directory
   ```sh
   # .env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the server
   ```sh
   go run cmd/main.go
   ```

   The server will start on `http://localhost:8080`

### Configuration

The backend uses environment variables for configuration. Create a `.env` file with:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

**Note**: Currently, the API key is also hardcoded in `utilities/genaiService/client.go`. For production, ensure you use environment variables only.

### Building for Production

```sh
# Build the binary
go build -o goOutputBuilds/tripPlannerBackend cmd/main.go

# Run the binary
./goOutputBuilds/tripPlannerBackend
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- API ENDPOINTS -->
## API Endpoints

### Base URL
```
http://localhost:8080/tripPlanner
```

### 1. Find Destination

**Endpoint:** `POST /findDestination`

**Description:** Analyzes user preferences and returns AI-suggested travel destinations.

**Request Body:**
```json
{
  "user_id": 101,
  "user_location": "India",
  "is_international_travel": true,
  "travel_days": 7,
  "travel_date_time": "2025-10-01T00:00:00Z",
  "traveling_method": "flight",
  "trip_nature": "leisure",
  "person_count": 2,
  "group_demographic": "couple",
  "budget": "medium",
  "custom_requirement": "Beach destinations preferred",
  "preferred_location": "Europe"
}
```

**Response:**
```json
{
  "code": 200,
  "status": "Success",
  "error": "",
  "response": {
    "locations": [
      {
        "place": "Santorini, Greece",
        "image": "https://images.unsplash.com/...",
        "description": "Stunning sunsets and white-washed buildings...",
        "cost": "Approximately $2,500 - $3,500 for 7 days"
      }
    ]
  }
}
```

### 2. Generate Itinerary

**Endpoint:** `POST /generateItinerary`

**Description:** Generates a detailed day-by-day itinerary for the selected destination.

**Request Body:**
```json
{
  "user_id": 101,
  "user_location": "India",
  "destination": "Santorini, Greece",
  "travel_days": 7,
  "travel_date_time": "2025-10-01T00:00:00Z",
  "person_count": 2,
  "group_demographic": "couple"
}
```

**Response:**
```json
{
  "code": 200,
  "status": "Success",
  "error": "",
  "response": {
    "itineraries": [
      {
        "overview": "Explore the iconic blue-domed churches...",
        "start_date": "01-10-25",
        "end_date": "03-10-25",
        "transport": [
          {
            "origin": "India",
            "destination": "Santorini",
            "distance": "6500 km"
          }
        ],
        "accomodation": {
          "duration": 3,
          "area": "Oia, Santorini"
        },
        "guide": true,
        "photoshoot": true
      }
    ],
    "summary": "A romantic 7-day journey through Santorini..."
  }
}
```

### 3. Process Itinerary

**Endpoint:** `POST /processItinerary`

**Description:** Processes and finalizes the approved itinerary.

**Request Body:**
```json
{
  "user_id": 101,
  "itinerary_data": { ... }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- PROJECT STRUCTURE -->
## Project Structure

```
trip-planner-backend/
├── cmd/
│   └── main.go                    # Application entry point
├── handler/
│   └── handler.go                 # HTTP route handlers
├── modules/
│   └── tripPlanner/
│       ├── controller/
│       │   ├── findDestination/
│       │   │   └── findDestinationController.go
│       │   ├── generateItinerary/
│       │   │   └── generateItineraryController.go
│       │   └── processItinerary/
│       │       └── processItineraryController.go
│       └── model/
│           ├── findDestination/
│           │   └── findDestinationModel.go    # AI integration & business logic
│           └── generateItinerary/
│               └── generateItineraryModel.go   # AI integration & business logic
├── utilities/
│   ├── genaiService/
│   │   ├── client.go              # Google Gemini client
│   │   └── models.go              # GenAI model utilities
│   ├── globalFunctions/
│   │   └── commonFunctions.go     # Common utility functions
│   ├── httpRequest/
│   │   └── httpRequest.go         # HTTP request utilities
│   └── imageMedia/
│       └── imageMedia.go          # Image validation and fetching
├── globalConstant/
│   └── globalConstant.go          # Global constants (model names, API URLs)
├── centralLogging/                # Application logs directory
├── goOutputBuilds/                 # Compiled binaries
├── go.mod                          # Go module dependencies
└── go.sum                          # Dependency checksums
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FEATURES -->
## Features

### AI Integration

- **Google Gemini 2.5 Flash**: Fast and efficient AI model for travel recommendations
- **Google Search Integration**: Real-time information retrieval for travel conditions
- **Structured Output**: JSON schema validation ensures consistent API responses
- **Intelligent Prompting**: System prompts optimized for travel recommendations

### Image Processing

- **Image Validation**: Validates image URLs from AI responses
- **Fallback System**: Fetches images from Google Custom Search if AI-provided URLs are invalid
- **High-Quality Images**: Ensures 16:9 aspect ratio and minimum 1600x900 resolution
- **Public Sources**: Uses Unsplash, Pexels, Pixabay, or Wikimedia Commons

### Logging

- **Centralized Logging**: All API requests and responses are logged
- **JSON Format**: Structured logs for easy parsing and analysis
- **Date-Based Files**: Logs organized by date (e.g., `find_destination_2025_09_19.log`)
- **Request Tracking**: Includes user inputs, API responses, and error information

### Error Handling

- **Comprehensive Error Handling**: Graceful error handling at all levels
- **HTTP Status Codes**: Proper status codes for different error scenarios
- **Error Messages**: Descriptive error messages in API responses

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE -->
## Usage

### Running the Server

```sh
# Development mode
go run cmd/main.go

# Production build
go build -o goOutputBuilds/tripPlannerBackend cmd/main.go
./goOutputBuilds/tripPlannerBackend
```

### Testing Endpoints

Using `curl`:

```sh
# Find Destination
curl -X POST http://localhost:8080/tripPlanner/findDestination \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 101,
    "is_international_travel": true,
    "travel_days": 7,
    "travel_date_time": "2025-10-01T00:00:00Z",
    "traveling_method": "flight",
    "trip_nature": "leisure",
    "person_count": 2,
    "group_demographic": "couple",
    "budget": "medium",
    "preferred_location": "Europe"
  }'
```

### Environment Variables

The backend supports the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/your_username/personalized-trip-planner-with-ai.svg?style=for-the-badge
[contributors-url]: https://github.com/your_username/personalized-trip-planner-with-ai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/your_username/personalized-trip-planner-with-ai.svg?style=for-the-badge
[forks-url]: https://github.com/your_username/personalized-trip-planner-with-ai/network/members
[stars-shield]: https://img.shields.io/github/stars/your_username/personalized-trip-planner-with-ai.svg?style=for-the-badge
[stars-url]: https://github.com/your_username/personalized-trip-planner-with-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/your_username/personalized-trip-planner-with-ai.svg?style=for-the-badge
[issues-url]: https://github.com/your_username/personalized-trip-planner-with-ai/issues
[license-shield]: https://img.shields.io/github/license/your_username/personalized-trip-planner-with-ai.svg?style=for-the-badge
[license-url]: https://github.com/your_username/personalized-trip-planner-with-ai/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/your_username
[Go]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Go-url]: https://go.dev/
[Gin]: https://img.shields.io/badge/Gin-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Gin-url]: https://gin-gonic.com/
[Gemini]: https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white
[Gemini-url]: https://ai.google.dev/
[godotenv]: https://img.shields.io/badge/godotenv-00ADD8?style=for-the-badge
[godotenv-url]: https://github.com/joho/godotenv
