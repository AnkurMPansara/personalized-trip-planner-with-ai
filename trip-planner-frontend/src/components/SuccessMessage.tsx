import React from 'react';

interface SuccessMessageProps {
    onStartNewTrip: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onStartNewTrip }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg max-w-2xl mx-auto">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold mb-4">Trip Planning Complete!</h2>
                    <p className="text-lg mb-6">
                        Your personalized trip itinerary has been successfully processed and is ready for your adventure!
                    </p>
                    <p className="text-sm text-green-600 mb-6">
                        You will receive a detailed confirmation email with all the necessary information for your trip.
                    </p>
                    <button 
                        onClick={onStartNewTrip}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-300"
                    >
                        Plan Another Trip
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SuccessMessage;
