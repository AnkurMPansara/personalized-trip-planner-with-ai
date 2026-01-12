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
  <a href="https://github.com/AnkurMPansara/personalized-trip-planner-with-ai">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">AI-Powered Personalized Trip Planner</h3>

  <p align="center">
    An intelligent travel planning application that uses AI to suggest destinations and generate personalized itineraries!
    <br />
    <a href="https://github.com/AnkurMPansara/personalized-trip-planner-with-ai"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/issues">Request Feature</a>
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
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The **AI-Powered Personalized Trip Planner** is a full-stack web application that leverages Google Gemini AI to help users discover travel destinations and generate detailed, personalized itineraries based on their preferences. The application considers factors such as travel dates, budget, group demographics, trip nature, and custom requirements to provide intelligent travel recommendations.

### Key Features

* **AI-Powered Destination Discovery**: Get personalized destination suggestions based on your travel preferences
* **Intelligent Itinerary Generation**: Automatically generate detailed day-by-day itineraries with transportation, accommodation, and activity recommendations
* **Real-Time Travel Conditions**: AI considers weather forecasts, travel advisories, local events, and safety alerts
* **Multi-Step User Flow**: Intuitive step-by-step process from preference collection to itinerary approval
* **Image Enrichment**: Automatic image fetching and validation for destination suggestions
* **Comprehensive Logging**: Centralized logging system for debugging and monitoring

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url] - Frontend framework
* [![TypeScript][TypeScript]][TypeScript-url] - Type-safe JavaScript
* [![Vite][Vite]][Vite-url] - Build tool and dev server
* [![Go][Go]][Go-url] - Backend programming language
* [![Gin][Gin]][Gin-url] - Go web framework
* [![Google Gemini AI][Gemini]][Gemini-url] - AI model for travel recommendations

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is a monorepo containing both the frontend and backend applications. Follow the instructions below to get both services running locally.

### Prerequisites

* **Node.js** (v18 or higher) and npm
  ```sh
  npm install npm@latest -g
  ```
* **Go** (v1.23 or higher)
  ```sh
  # Download from https://go.dev/dl/
  ```
* **Google Gemini API Key**
  - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/AnkurMPansara/personalized-trip-planner-with-ai.git
   cd personalized-trip-planner-with-ai
   ```

2. **Backend Setup**
   ```sh
   cd trip-planner-backend
   
   # Create a .env file in the backend directory
   # Add your Google Gemini API key:
   # GEMINI_API_KEY=your_api_key_here
   
   # Initialize the package
   go mod init trip-planner-backend

   #Download all dependencies
   go mod tidy
   
   # Run the backend server (default port: 8080)
   go run cmd/main.go
   ```

3. **Frontend Setup**
   ```sh
   cd trip-planner-frontend
   
   # Install dependencies
   npm install
   
   # Start the development server (default port: 5173)
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- PROJECT STRUCTURE -->
## Project Structure

```
personalized-trip-planner-with-ai/
├── trip-planner-backend/     # Go backend API server
│   ├── cmd/                  # Application entry point
│   ├── handler/              # HTTP route handlers
│   ├── modules/              # Business logic modules
│   │   └── tripPlanner/
│   │       ├── controller/   # Request controllers
│   │       └── model/       # Data models and AI integration
│   ├── utilities/            # Utility functions (GenAI client, HTTP, image processing)
│   └── globalConstant/      # Global constants
│
└── trip-planner-frontend/    # React frontend application
    ├── src/
    │   ├── components/       # React components
    │   │   ├── api/         # API integration components
    │   │   ├── Hero/        # Hero section and multi-step form
    │   │   ├── Header/      # Navigation header
    │   │   └── Footer/      # Footer component
    │   └── App.tsx          # Main application component
    └── public/              # Static assets
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FEATURES -->
## Features

### 1. Destination Discovery
- Input your travel preferences (destination type, budget, group type, etc.)
- AI analyzes your requirements and suggests up to 5 suitable destinations
- Each suggestion includes:
  - Place name and description
  - High-quality images (16:9 aspect ratio)
  - Estimated trip cost
  - Tourism highlights

### 2. Itinerary Generation
- Select a destination from the suggestions
- AI generates a detailed itinerary divided into logical parts
- Each itinerary part includes:
  - Overview with activities and recommendations
  - Start and end dates
  - Transportation details (origin, destination, distance)
  - Accommodation suggestions (duration, area)
  - Guide and photoshoot recommendations
- Complete trip summary with attractions

### 3. Real-Time Intelligence
- Weather forecasts for travel dates
- Official travel advisories
- Major local events and festivals
- Transport disruptions and strikes
- Health alerts and natural disaster warnings
- Safety risk assessment

### 4. User Experience
- Multi-step form with dynamic component loading
- Responsive design for all devices
- Loading states and error handling
- Destination image fallback system
- Itinerary regeneration capability

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE -->
## Usage

### User Flow

1. **Enter Preferences**: Fill out the multi-step form with:
   - Your location
   - Travel type (domestic/international)
   - Travel schedule (dates and duration)
   - Trip nature (leisure, adventure, business, etc.)
   - Travel party (solo, couple, family, friends)
   - Budget range
   - Preferred location/region
   - Custom requirements

2. **Browse Destinations**: Review AI-suggested destinations with images and descriptions

3. **Select Destination**: Choose your preferred destination

4. **Review Itinerary**: View the generated detailed itinerary with all trip parts

5. **Approve & Process**: Approve the itinerary to proceed with booking

### Example Request

**Find Destination:**
```json
POST /tripPlanner/findDestination
{
  "user_id": 101,
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- API ENDPOINTS -->
## API Endpoints

### Base URL
```
http://localhost:8080/tripPlanner
```

### Endpoints

1. **Find Destination**
   - `POST /findDestination`
   - Returns: List of suggested destinations with images and costs

2. **Generate Itinerary**
   - `POST /generateItinerary`
   - Returns: Detailed itinerary with transportation, accommodation, and activities

3. **Process Itinerary**
   - `POST /processItinerary`
   - Processes and finalizes the approved itinerary

For detailed API documentation, see [Backend README](trip-planner-backend/README.md)

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



<!-- CONTACT -->
## Contact

Ankur Pansara - ankur.at.surat@gmail.com

Project Link: [https://github.com/AnkurMPansara/personalized-trip-planner-with-ai](https://github.com/AnkurMPansara/personalized-trip-planner-with-ai)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/forks
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/AnkurMPansara/personalized-trip-planner-with-ai/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ankur-pansara/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Go]: https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Go-url]: https://go.dev/
[Gin]: https://img.shields.io/badge/Gin-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Gin-url]: https://gin-gonic.com/
[Gemini]: https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white
[Gemini-url]: https://ai.google.dev/
