import React, { useState } from "react";
import './Dynamicloader.css';
import UserLocation from './UserLocation/UserLocation';
import TravelTypeSelector from './TravelTypeSelector/TravelTypeSelector';
import TravelSchedule from './TravelSchedule/TravelSchedule';
import TripNature from './TripNature/TripNature';
import TravelParty from './TravelParty/TravelParty';
import TripBudget from './TripBudget/TripBudget';
import PreferredLocation from './PreferredLocation/PreferredLocation';
import LocationSuggestion from "./LocationSuggestion/LocationSuggestion";
import ItineraryGeneration from "./ItineraryGeneration/ItineraryGeneration";
import ProcessItinerary from "./ProcessItinerary/ProcessItinerary";

const steps = [
    UserLocation, TravelTypeSelector, TravelSchedule, TripNature, TravelParty, TripBudget, PreferredLocation, LocationSuggestion, ItineraryGeneration, ProcessItinerary
];

const Dynamicloader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const CurrentComponent = steps[currentStep];
    return (
        <section className="dynamicloader">
            <CurrentComponent
                onNext={(step: number) => setCurrentStep(step)}
            />
        </section>
    );
};

export default Dynamicloader;