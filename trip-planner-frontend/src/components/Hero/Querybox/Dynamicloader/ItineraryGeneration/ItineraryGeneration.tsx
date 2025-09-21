import React, { useState, useEffect } from 'react';
import './ItineraryGeneration.css';
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

const CreateItineraryUrl = import.meta.env.VITE_CREATE_ITINERARY_URL

interface CreateItineraryPayload {
    user_id: number;
    user_location: string;
    destination: string;
    travel_days: number;
    travel_date_time: string;
    person_count: number;
    group_demographic: string;
}

interface CreateItineraryResponse {
    itineraries: Itinerary[];
    summary: string;
}

interface Itinerary {
    overview: string;
    start_date: string;
    end_date: string;
    transport: Transport[];
    accomodation: Accomodation;
    guide: boolean;
    photoshoot: boolean;
}

interface Transport {
    origin: string;
    destination: string;
    distance: string;
}

interface Accomodation {
    duration: number;
    area: string;
}

const CreateItinerary = async (payload: CreateItineraryPayload): Promise<CreateItineraryResponse> => {
    const response = await fetch(CreateItineraryUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data.response || { summary: "", itineraries: [] };
}

const Loader: React.FC = () => (
    <div className="loader-overlay">
        <Tailspin
            size="128"
            stroke="8"
            speed="1.9"
            color="#0099ff"
        />
        <div className="loader-label">Creating perfect travel plan for your adventure...</div>
    </div>
);

interface ItineraryGenerationProps {
    onNext: (step: number) => void;
}

const ItineraryGeneration: React.FC<ItineraryGenerationProps> = ({ onNext }) => {
    const [loading, setLoading] = useState(true);
    const [itinerary, setItinerary] = useState<CreateItineraryResponse>({ summary: "", itineraries: [] });

    const cookieName = "user_data";
    const existing = getCookie(cookieName);
    let userData = existing ? JSON.parse(existing) : {};

    const FinalizeItinerary = () => {
        userData.itinerary = itinerary
        setCookie(cookieName, JSON.stringify(userData), 7);
        onNext(9);
    }

    useEffect(() => {
        const payload: CreateItineraryPayload = {
            user_id: userData.user_id ?? 1,
            user_location: userData.user_location ?? "India",
            destination: userData.destination ?? "",
            travel_days: userData.travel_days ?? 0,
            travel_date_time: userData.travel_date_time ?? "",
            person_count: userData.person_count ?? 1,
            group_demographic: userData.group_demographic ?? "Adults",
        };
        const loadData = async () => {
            try {
                const response = await CreateItinerary(payload);
                setItinerary(response);
            } catch (err) {
                console.error("Error generating itinerary:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();

    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <section className="itinerary-generation">
            <div className='itinerary-label'>Trip Details</div>
            <div className='itinerary-details'>
                <div className='itinerary-summary'>
                    <div className='summary-label'>Summary</div>
                    <div className='summary-content'>{itinerary.summary}</div>
                </div>
                <div className='itinerary-list'>
                    {itinerary.itineraries.map((part, idx) => (
                        <article className='itinerary-part' key={idx}>
                            <div className='part-header'>
                                {part.start_date === part.end_date
                                    ? part.start_date
                                    : `${part.start_date} - ${part.end_date}`}
                            </div>
                            <div className='part-body'>
                                {
                                    part.transport.length > 0 &&
                                    part.transport.map((t, i) => (
                                        <div className='part-transport' key={i}>
                                            {`${t.origin} -> ${t.destination} : ${t.distance}`}
                                        </div>
                                    ))
                                }
                                {
                                    part.accomodation.duration > 0 &&
                                    <div className='part-accomodation'>
                                        {`Hotel stay at ${part.accomodation.area} for ${part.accomodation.duration} days`}
                                    </div>
                                }
                                {
                                    (part.guide || part.photoshoot) &&
                                    (<div className='part-extra'>
                                        {
                                            part.guide &&
                                            <div className='part-guide'>
                                                Tour Guide
                                            </div>
                                        }
                                        {
                                            part.photoshoot &&
                                            <div className='part-photoshoot'>
                                                Photoshoot
                                            </div>
                                        }
                                    </div>)
                                }
                                <div className='part-overview'>
                                    {part.overview}
                                </div>
                            </div>
                        </article>
                    ))};
                </div>
            </div>
            <button className='itinerary-confirmation' onClick={FinalizeItinerary}>Book Now</button>
        </section>
    );
};

export default ItineraryGeneration;