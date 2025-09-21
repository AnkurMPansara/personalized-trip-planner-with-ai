import React, { useState } from 'react';

// --- Type Definitions ---
interface ItineraryResponse {
    itineraries: any[];
    summary: string;
}

interface ProcessItineraryAPIProps {
    itineraryData: ItineraryResponse;
    onSuccess: () => void;
    onError: (error: string) => void;
    onLoading: (loading: boolean) => void;
}

const ProcessItineraryAPI: React.FC<ProcessItineraryAPIProps> = ({
    itineraryData,
    onSuccess,
    onError,
    onLoading
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const callProcessItineraryAPI = async () => {
        console.log('ProcessItineraryAPI: Starting API call with itinerary data:', itineraryData);
        setIsLoading(true);
        onLoading(true);

        // Since the backend just returns a dummy response, we'll pass some dummy data
        const requestBody = {
            itinerary_summary: itineraryData.summary,
            selected_destination: "taj mahal", // Dummy param as mentioned
            user_confirmation: true
        };
        
        console.log('ProcessItineraryAPI: Request body:', requestBody);
        
        try {
            console.log('ProcessItineraryAPI: Making API call to:', 'http://localhost:8080/tripPlanner/processItinerary');
            
            const response = await fetch('http://localhost:8080/tripPlanner/processItinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            console.log('ProcessItineraryAPI: Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('ProcessItineraryAPI: API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('ProcessItineraryAPI: API Response:', data);
            
            // Since this is just a success confirmation, we don't need to validate the response
            onSuccess();
        } catch (e) {
            console.error("ProcessItineraryAPI: API call failed:", e);
            onError(e instanceof Error ? e.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
            onLoading(false);
        }
    };

    // Auto-call the API when component mounts
    React.useEffect(() => {
        callProcessItineraryAPI();
    }, []);

    return null; // This component doesn't render anything
};

export default ProcessItineraryAPI;
