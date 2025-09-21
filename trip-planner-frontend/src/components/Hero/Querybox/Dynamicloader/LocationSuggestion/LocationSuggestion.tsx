import React, { useState, useEffect } from 'react';
import './LocationSuggestion.css';
import fallbackImage from '../../../../../assets/destination-fallback.png';
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

const findDestinationUrl = import.meta.env.VITE_GET_DESTINATION_URL

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

interface findDestinationPayload {
    user_id: number;
    user_location: string;
    is_international_travel: boolean;
    travel_days: number;
    travel_date_time: string;
    traveling_method: string;
    trip_nature: string;
    person_count: number;
    group_demographic: string;
    budget: string;
    custom_requirement: string;
    preferred_location: string;
}

const findDestination = async (payload: findDestinationPayload): Promise<DestinationSuggestionProps> => {
    const response = await fetch(findDestinationUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data.response || {locations: []};
};

const Loader: React.FC = () => (
    <div className="loader-overlay">
        <Tailspin
            size="128"
            stroke="8"
            speed="1.9"
            color="#0099ff"
        />
        <div className="loader-label">Finding perfect destinations to start your journey...</div>
    </div>
);

interface DestinationSuggestionProps {
    locations: GeneratedDestination[];
}

interface GeneratedDestination {
    place: string;
    image: string;
    description: string;
    cost: string;
}

interface DestinationCardProps extends GeneratedDestination {
    onSelect: (destination: GeneratedDestination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ place, image, description, cost, onSelect }) => (
    <div className='destination-card'>
        <img src={image || fallbackImage} alt={place} className='destination-image' />
        <div className='destination-info'>
            <div className='destination-place'>{place}</div>
            <div className='destination-cost'>{cost}</div>
            <div className='destination-desc'>{description}</div>
            <button className='destination-select-btn' onClick={() => onSelect({ place, image, description, cost})}>Book Now</button>
        </div>
    </div>
);

interface LocationSuggestionProps {
  onNext: (step: number) => void;
}

const LocationSuggestion: React.FC<LocationSuggestionProps> = ({ onNext }) => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<GeneratedDestination[]>([])

  const cookieName = "user_data";
  const existing = getCookie(cookieName);
  let userData = existing ? JSON.parse(existing) : {};

  const selectDestination = (destination: GeneratedDestination) => {
    userData.destination = destination.place
    userData.destination_image = destination.image
    setCookie(cookieName, JSON.stringify(userData), 7);
    onNext(8);
  }

  useEffect(() => {
    const payload: findDestinationPayload = {
        user_id: userData.user_id ?? 1,
        user_location: userData.user_location ?? "India",
        is_international_travel: userData.is_international_travel ?? false,
        travel_days: userData.travel_days ?? 0,
        travel_date_time: userData.travel_date_time ?? "",
        traveling_method: userData.traveling_method ?? "",
        trip_nature: userData.trip_nature ?? "",
        person_count: userData.person_count ?? 1,
        group_demographic: userData.group_demographic ?? "Adults",
        budget: userData.budget ?? "unspecified",
        custom_requirement: userData.custom_requirement ?? "",
        preferred_location: userData.preferred_location ?? "",
    };
    const loadData = async () => {
        try {
            const response = await findDestination(payload);
            setLocations(response.locations);
        } catch (err) {
            console.error("Error fetching destinations:", err);
        } finally {
            setLoading(false);
        }
    };
    loadData();
    
  },[]);

  if (loading) {
    return <Loader />
  }

  return (
    <section className="locationsuggestion">
        <div className='destination-label'>Please select one of the below destinations to create a trip plan</div>
        <div className='destination-list'>
            {locations.length > 0 ? (locations.map((loc, idx) => (
                <DestinationCard
                    key={idx}
                    place={loc.place}
                    image={loc.image}
                    description={loc.description}
                    cost={loc.cost}
                    onSelect={selectDestination}
                />
            ))) : (
                <div className='no-destination'>No suitable destination found.</div>
            )}
        </div>
    </section>
  );
};

export default LocationSuggestion;