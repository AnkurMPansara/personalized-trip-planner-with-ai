# Trip Planner Frontend

A modern, responsive React application for planning personalized trips with AI-powered destination suggestions and itinerary generation.

## 🚀 Features

- **Multi-Step Form Flow**: Intuitive step-by-step form for collecting user preferences
- **AI-Powered Destination Discovery**: Browse AI-suggested destinations with images and descriptions
- **Dynamic Itinerary Generation**: View detailed, personalized itineraries with transportation and accommodation details
- **Responsive Design**: Beautiful UI that works on all devices
- **Type-Safe**: Built with TypeScript for type safety and better developer experience
- **Fast Development**: Powered by Vite for lightning-fast HMR and builds

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [ESLint](https://eslint.org/) - Code linting

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

## 🚦 Getting Started

### Installation

1. Navigate to the frontend directory:
   ```sh
   cd trip-planner-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```sh
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```sh
npm run preview
```

## 📁 Project Structure

```
trip-planner-frontend/
├── src/
│   ├── components/
│   │   ├── api/                    # API integration components
│   │   │   ├── FindDestinationAPI.tsx
│   │   │   ├── GenerateItineraryAPI.tsx
│   │   │   └── ProcessItineraryAPI.tsx
│   │   ├── Hero/                   # Hero section and multi-step form
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroSlider/
│   │   │   └── Querybox/
│   │   │       └── Dynamicloader/  # Dynamic step loader
│   │   │           ├── UserLocation/
│   │   │           ├── TravelTypeSelector/
│   │   │           ├── TravelSchedule/
│   │   │           ├── TripNature/
│   │   │           ├── TravelParty/
│   │   │           ├── TripBudget/
│   │   │           ├── PreferredLocation/
│   │   │           ├── LocationSuggestion/
│   │   │           ├── ItineraryGeneration/
│   │   │           └── ProcessItinerary/
│   │   ├── Header/                 # Navigation header
│   │   │   ├── Header.tsx
│   │   │   ├── Logo/
│   │   │   ├── Navigation/
│   │   │   └── HeaderExtra/
│   │   ├── Footer/                 # Footer component
│   │   ├── DestinationSelection.tsx
│   │   ├── ItineraryDisplay.tsx
│   │   └── SuccessMessage.tsx
│   ├── App.tsx                     # Main application component
│   ├── AppArvind.tsx               # Alternative app implementation
│   ├── main.tsx                    # Application entry point
│   └── assets/                     # Static assets
├── public/                         # Public assets
├── package.json
├── vite.config.ts                  # Vite configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎯 User Flow

1. **Form Input**: User fills out multi-step form with travel preferences
   - User location
   - Travel type (domestic/international)
   - Travel schedule (dates and duration)
   - Trip nature (leisure, adventure, business, etc.)
   - Travel party (solo, couple, family, friends)
   - Budget range
   - Preferred location/region
   - Custom requirements

2. **Destination Discovery**: System calls backend API to get AI-suggested destinations

3. **Destination Selection**: User browses and selects a destination from suggestions

4. **Itinerary Generation**: System generates detailed itinerary for selected destination

5. **Itinerary Review**: User reviews the complete itinerary with all trip parts

6. **Approval**: User approves and processes the itinerary

## 🔌 API Integration

The frontend communicates with the backend API at `http://localhost:8080/tripPlanner`:

- **Find Destination**: `POST /findDestination`
- **Generate Itinerary**: `POST /generateItinerary`
- **Process Itinerary**: `POST /processItinerary`

### API Components

The application uses dedicated API components for each endpoint:

- `FindDestinationAPI.tsx`: Handles destination discovery API calls
- `GenerateItineraryAPI.tsx`: Handles itinerary generation API calls
- `ProcessItineraryAPI.tsx`: Handles itinerary processing API calls

## 🎨 Components Overview

### Hero Section
- Main landing section with search functionality
- Multi-step form with dynamic component loading
- Step-by-step progression through travel preferences

### Dynamic Loader
A dynamic component loader that renders different steps:
1. User Location
2. Travel Type Selector
3. Travel Schedule
4. Trip Nature
5. Travel Party
6. Trip Budget
7. Preferred Location
8. Location Suggestion (displays AI suggestions)
9. Itinerary Generation (displays generated itinerary)
10. Process Itinerary (final step)

### Destination Selection
- Displays AI-suggested destinations
- Image carousel/grid view
- Destination details (description, cost)
- Selection functionality

### Itinerary Display
- Detailed itinerary breakdown
- Transportation information
- Accommodation suggestions
- Activity recommendations
- Guide and photoshoot options

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality. Make sure your code follows the linting rules before committing.

## 🔧 Configuration

### Backend API URL

The API base URL is currently hardcoded in the API components. To change it, update the fetch URLs in:

- `src/components/api/FindDestinationAPI.tsx`
- `src/components/api/GenerateItineraryAPI.tsx`
- `src/components/api/ProcessItineraryAPI.tsx`

For production, consider using environment variables:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

## 📝 TypeScript

The project is fully typed with TypeScript. Key interfaces include:

- `TripFormData`: User form input data
- `Location`: Destination information
- `Itinerary`: Itinerary structure
- `ItineraryResponse`: Complete itinerary response
- `ApiResponse`: Generic API response wrapper

## 🐛 Troubleshooting

### API Connection Issues

If you're having trouble connecting to the backend:

1. Ensure the backend server is running on `http://localhost:8080`
2. Check CORS settings in the backend
3. Verify the API endpoints match the backend routes

### Build Issues

If you encounter build errors:

1. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check Node.js version: `node --version` (should be v18+)

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
