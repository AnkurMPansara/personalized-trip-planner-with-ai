import React from 'react';

// --- Type Definitions ---
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

interface ItineraryDisplayProps {
    itinerary: ItineraryResponse;
    onApproveItinerary: () => void;
    onRegenerateItinerary: () => void;
    isLoading: boolean;
    error: string | null;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
    itinerary,
    onApproveItinerary,
    onRegenerateItinerary,
    isLoading,
    error
}) => {
    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                <p className="mt-6 text-lg text-gray-600">Generating your detailed itinerary...</p>
            </div>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Oops!</strong>
                    <span className="block sm:inline ml-2">Something went wrong: {error}</span>
                    <div className="mt-4">
                        <button 
                            onClick={onRegenerateItinerary}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!itinerary || !itinerary.itineraries || itinerary.itineraries.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Your Detailed Itinerary</h2>
            
            {/* Trip Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Trip Summary</h3>
                <p className="text-blue-700">{itinerary.summary}</p>
            </div>

            {/* Itinerary Parts */}
            <div className="space-y-8">
                {itinerary.itineraries.map((part, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Part {index + 1}</h3>
                            <div className="text-sm text-gray-600">
                                {part.start_date} - {part.end_date}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Overview:</h4>
                            <p className="text-gray-600">{part.overview}</p>
                        </div>

                        {/* Transport */}
                        {part.transport && part.transport.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Transport:</h4>
                                <div className="space-y-2">
                                    {part.transport.map((transport, transportIndex) => (
                                        <div key={transportIndex} className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">{transport.origin}</span> → 
                                                <span className="font-medium">{transport.destination}</span>
                                                <span className="text-gray-500 ml-2">({transport.distance})</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Accommodation */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Accommodation:</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">{part.accomodation.duration} days</span> in 
                                    <span className="font-medium ml-1">{part.accomodation.area}</span>
                                </p>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex gap-4">
                            {part.guide && (
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    ✓ Guide Included
                                </span>
                            )}
                            {part.photoshoot && (
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    ✓ Photoshoot Included
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                <button 
                    onClick={onApproveItinerary}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition duration-300"
                >
                    Approve This Itinerary
                </button>
                <button 
                    onClick={onRegenerateItinerary}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition duration-300"
                >
                    Generate Different Itinerary
                </button>
            </div>
        </section>
    );
};

export default ItineraryDisplay;
