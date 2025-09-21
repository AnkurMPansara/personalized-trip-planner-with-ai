import React, { useState } from 'react';

// --- Type Definitions ---
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

interface Location {
    place: string;
    image: string;
    description: string;
    cost: string;
}

interface TripPlanResponse {
    locations: Location[];
}

interface ApiResponse {
    code: number;
    status: string;
    error: string;
    response: TripPlanResponse;
}

interface FindDestinationAPIProps {
    formData: TripFormData;
    onDestinationsFound: (destinations: Location[]) => void;
    onError: (error: string) => void;
    onLoading: (loading: boolean) => void;
}

const FindDestinationAPI: React.FC<FindDestinationAPIProps> = ({
    formData,
    onDestinationsFound,
    onError,
    onLoading
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const callFindDestinationAPI = async () => {
        console.log('FindDestinationAPI: Starting API call with data:', formData);
        setIsLoading(true);
        onLoading(true);

        const requestBody = {
            user_id: 101,
            is_international_travel: true,
            travel_days: Number(formData.days),
            travel_date_time: new Date(formData.date).toISOString(),
            traveling_method: "flight",
            trip_nature: formData.activeCategory?.toLowerCase() || "leisure",
            person_count: Number(formData.people),
            group_demographic: formData.group.toLowerCase(),
            budget: formData.budget.toLowerCase(),
            custom_requirement: formData.customReq,
            preferred_location: formData.destination,
        };
        
        console.log('FindDestinationAPI: Request body:', requestBody);
        
        try {
            console.log('FindDestinationAPI: Making API call to:', 'http://localhost:8080/tripPlanner/findDestination');
            
            const response = await fetch('http://localhost:8080/tripPlanner/findDestination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            console.log('FindDestinationAPI: Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('FindDestinationAPI: API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data: ApiResponse = await response.json();
            console.log('FindDestinationAPI: API Response:', data);
            
            if (data.code === 200 && data.response && data.response.locations) {
                onDestinationsFound(data.response.locations);
            } else {
                throw new Error(data.error || 'No destinations found');
            }
        } catch (e) {
            console.error("FindDestinationAPI: Search failed:", e);
            onError(e instanceof Error ? e.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
            onLoading(false);
        }
    };

    // Auto-call the API when component mounts
    React.useEffect(() => {
        callFindDestinationAPI();
    }, []);

    return null; // This component doesn't render anything
};

export default FindDestinationAPI;
