import React, { useState } from 'react';

// --- Type Definitions ---
interface Location {
    place: string;
    image: string;
    description: string;
    cost: string;
}

interface TripFormData {
    destination: string;
    activeCategory: string | null;
    days: number;
    date: string;
    people: number;
    group: string;
    budget: string;
    customReq: string;
}

interface Transport {
    origin: string;
    destination: string;
    distance: string;
}

interface Accommodation {
    duration: number;
    area: string;
}

interface Itinerary {
    overview: string;
    start_date: string;
    end_date: string;
    transport: Transport[];
    accomodation: Accommodation;
    guide: boolean;
    photoshoot: boolean;
}

interface ItineraryResponse {
    itineraries: Itinerary[];
    summary: string;
}

interface ApiResponse {
    code: number;
    status: string;
    error: string;
    response: ItineraryResponse;
}

interface GenerateItineraryAPIProps {
    selectedDestination: Location;
    formData: TripFormData;
    onItineraryGenerated: (itinerary: ItineraryResponse) => void;
    onError: (error: string) => void;
    onLoading: (loading: boolean) => void;
}

const GenerateItineraryAPI: React.FC<GenerateItineraryAPIProps> = ({
    selectedDestination,
    formData,
    onItineraryGenerated,
    onError,
    onLoading
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const callGenerateItineraryAPI = async () => {
        console.log('GenerateItineraryAPI: Starting API call with selected destination:', selectedDestination);
        setIsLoading(true);
        onLoading(true);

        const requestBody = {
            user_id: 101,
            user_location: "India", // Default user location
            destination: selectedDestination.place,
            travel_days: Number(formData.days),
            travel_date_time: new Date(formData.date).toISOString(),
            person_count: Number(formData.people),
            group_demographic: formData.group.toLowerCase(),
        };
        
        console.log('GenerateItineraryAPI: Request body:', requestBody);
        
        try {
            console.log('GenerateItineraryAPI: Making API call to:', 'http://localhost:8080/tripPlanner/generateItinerary');
            
            const response = await fetch('http://localhost:8080/tripPlanner/generateItinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            console.log('GenerateItineraryAPI: Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('GenerateItineraryAPI: API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data: ApiResponse = await response.json();
            console.log('GenerateItineraryAPI: API Response:', data);
            
            if (data.code === 200 && data.response) {
                onItineraryGenerated(data.response);
            } else {
                throw new Error(data.error || 'Failed to generate itinerary');
            }
        } catch (e) {
            console.error("GenerateItineraryAPI: API call failed:", e);
            onError(e instanceof Error ? e.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
            onLoading(false);
        }
    };

    // Auto-call the API when component mounts
    React.useEffect(() => {
        callGenerateItineraryAPI();
    }, []);

    return null; // This component doesn't render anything
};

export default GenerateItineraryAPI;
