import React from 'react';

// --- Type Definitions ---
interface Location {
    place: string;
    image: string;
    description: string;
    cost: string;
}

interface DestinationSelectionProps {
    destinations: Location[];
    onSelectDestination: (destination: Location) => void;
    onRegenerateDestinations: () => void;
    isLoading: boolean;
    error: string | null;
}

const DestinationSelection: React.FC<DestinationSelectionProps> = ({
    destinations,
    onSelectDestination,
    onRegenerateDestinations,
    isLoading,
    error
}) => {
    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                <p className="mt-6 text-lg text-gray-600">Finding the best destinations for you...</p>
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
                            onClick={onRegenerateDestinations}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!destinations || destinations.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">We found these amazing destinations for you!</h2>
            <p className="text-center text-gray-600 mb-8">Please select your preferred destination to continue with detailed itinerary planning.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((location: Location) => (
                    <div key={location.place} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2">
                        <img className="h-56 w-full object-cover" src={location.image} alt={`Image of ${location.place}`} />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="font-bold text-xl mb-2 text-gray-800">{location.place}</h3>
                            <p className="text-gray-600 text-base flex-grow">{location.description}</p>
                            <div className="mt-4">
                                <p className="font-semibold text-gray-700">Estimated Cost:</p>
                                <p className="text-indigo-600 font-bold text-lg">{location.cost}</p>
                            </div>
                            <button 
                                onClick={() => onSelectDestination(location)}
                                className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                Select This Destination
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-8">
                <button 
                    onClick={onRegenerateDestinations}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Show Different Options
                </button>
            </div>
        </section>
    );
};

export default DestinationSelection;
