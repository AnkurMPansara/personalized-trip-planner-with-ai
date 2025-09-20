import React, { useState, useEffect } from 'react';

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

// --- Script and Font Loader ---
// This component loads the necessary Tailwind CSS script and Google Fonts.
const ExternalResourcesLoader = () => {
  useEffect(() => {
    // Load Tailwind CSS
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);

    // Load Inter font from Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Cleanup function to remove the elements if the component unmounts
    return () => {
      document.head.removeChild(tailwindScript);
      document.head.removeChild(fontLink);
    };
  }, []); // The empty array ensures this effect runs only once on mount

  return null; // This component does not render any visible UI
};


// --- SVG Icon Components ---
const LogoIcon = () => (
    <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/><path d="m11 12 2 3 2-3"/></svg>
);

const CustomerServiceIcon = () => (
    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/><path d="M12 15a3 3 0 0 0 3-3c0-.9-.4-1.8-1-2.5"/></svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const SearchIcon = () => (
    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const EasyBookIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.24 12.24a5 5 0 0 0-7.07-7.07l-6.37 6.37a5 5 0 0 0-1.41 3.54v2.83h2.83a5 5 0 0 0 3.54-1.41l6.37-6.37Z"/><path d="m14 7 3 3"/><path d="M5 22v-5l-1-1v-5l-1-1v-4h4l1-1h5l1-1h5"/></svg>
);

const HoneymoonIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

const LuxuryIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L8 7l4 5 4-5-4-5z"/><path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3"/></svg>
);

const AdventureIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-1.45-1.05-2.68-2.43-2.92"/><path d="m14.94 7.07 5.66-5.66"/><path d="M3.51 20.49 2 22"/><path d="m18 11 2-2"/><path d="m2 2 1.5 1.5"/><path d="M22 22 20.5 20.5"/><path d="m7.07 7.07-5.66 5.66"/></svg>
);

const ChatIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12h.01"/><path d="M20 12h.01"/><path d="M4 12h.01"/><path d="M17.5 18.5c.34.34.66.7.97 1.09.2.26.43.5.68.75.25.26.52.5.8.73.4.34.82.64 1.28.9.22.13.44.25.67.36.23.11.46.21.7.3.1.04.2.08.3.12a2 2 0 0 1-.36 3.61c-.39.04-.78-.04-1.15-.22a14.7 14.7 0 0 1-5.75-3.32c-1.35-1.12-2.5-2.5-3.32-4.06C5.46 13.9 5 12 5 10c0-2.1.5-4 1.48-5.63"/><path d="M16 5.5c-.34-.34-.66-.7-.97-1.09-.2-.26-.43-.5-.68-.75-.25-.26-.52-.5-.8-.73-.4-.34-.82-.64-1.28-.9-.22-.13-.44-.25-.67-.36-.23-.11-.46.21-.7-.3-.1-.04-.2-.08-.3-.12a2 2 0 0 0 .36-3.61c.39-.04.78.04 1.15-.22a14.7 14.7 0 0 1 5.75 3.32c1.35 1.12 2.5 2.5 3.32 4.06C20.54 12.1 21 14 21 16c0 2.1-.5 4-1.48 5.63"/></svg>
);

// --- UI Components ---

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('Holidays');
    const navLinks = ['Flights', 'Hotels', 'Trains', 'Holidays', 'Cabs', 'Activities'];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center space-x-2">
                            <LogoIcon />
                            <span className="text-2xl font-bold text-gray-800">TripGenie</span>
                        </a>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
                        {navLinks.map(link => (
                            <a
                                key={link}
                                href="#"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeLink === link ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                                onClick={(e) => {e.preventDefault(); setActiveLink(link);}}
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm font-medium flex items-center">
                            <CustomerServiceIcon /> Customer Service
                        </a>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition duration-300">
                            Login or Signup
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <MenuIcon />
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden pt-2 pb-4">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map(link => (
                                <a
                                    key={link}
                                    href="#"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === link ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                    onClick={(e) => { e.preventDefault(); setActiveLink(link); setIsMenuOpen(false); }}
                                >
                                    {link}
                                </a>
                             ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

const Hero = ({ onSearch }: { onSearch: (formData: TripFormData) => void; }) => {
    const [searchValue, setSearchValue] = useState("Switzerland");
    const [activeCategory, setActiveCategory] = useState<string | null>('Luxury');
    
    const [days, setDays] = useState(7);
    const [date, setDate] = useState(() => {
        const d = new Date(2025, 11, 15); // Month is 0-indexed, so 11 is December
        return d.toISOString().split('T')[0];
    });
    const [people, setPeople] = useState(4);
    const [group, setGroup] = useState('family');
    const [budget, setBudget] = useState('medium');
    const [customReq, setCustomReq] = useState("Need vegetarian food options and kid-friendly activities");


    const categories = {
        'Easy Book': <EasyBookIcon />,
        'Honeymoon': <HoneymoonIcon />,
        'Luxury': <LuxuryIcon />,
        'Adventure': <AdventureIcon />,
    };
    
    const handleSearchClick = () => {
        onSearch({
            destination: searchValue,
            activeCategory,
            days,
            date,
            people,
            group,
            budget,
            customReq
        });
    };

    return (
        <section className="relative hero-bg text-white">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">AI-Powered Trip Planner</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Where Every Experience Counts!</p>
                <div className="mt-8 max-w-4xl mx-auto bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                         {/* Destination Input */}
                        <div className="flex flex-col items-start col-span-1 md:col-span-3">
                            <label className="text-white font-semibold mb-2 ml-2">Destination</label>
                            <div className="flex items-center w-full bg-white rounded-full shadow-lg p-2">
                                <div className="flex items-center w-full flex-grow pl-4">
                                    <SearchIcon />
                                    <input 
                                        type="text" 
                                        placeholder="Enter Your Dream Destination!" 
                                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-500 py-2 px-3"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Other Inputs */}
                        <div className="flex flex-col items-start">
                             <label className="text-white font-semibold mb-2 ml-2">Travel Date</label>
                             <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 rounded-full text-gray-800"/>
                        </div>
                        <div className="flex flex-col items-start">
                             <label className="text-white font-semibold mb-2 ml-2">Days</label>
                             <input type="number" value={days} onChange={e => setDays(parseInt(e.target.value, 10) || 0)} className="w-full p-3 rounded-full text-gray-800"/>
                        </div>
                         <div className="flex flex-col items-start">
                             <label className="text-white font-semibold mb-2 ml-2">People</label>
                             <input type="number" value={people} onChange={e => setPeople(parseInt(e.target.value, 10) || 0)} className="w-full p-3 rounded-full text-gray-800"/>
                        </div>
                        <div className="flex flex-col items-start">
                            <label className="text-white font-semibold mb-2 ml-2">Group</label>
                            <select value={group} onChange={e => setGroup(e.target.value)} className="w-full p-3 rounded-full text-gray-800">
                                <option>Family</option>
                                <option>Friends</option>
                                <option>Couple</option>
                                <option>Solo</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start">
                            <label className="text-white font-semibold mb-2 ml-2">Budget</label>
                            <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full p-3 rounded-full text-gray-800">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                             <textarea value={customReq} onChange={(e) => setCustomReq(e.target.value)} placeholder="Any custom requirements? e.g. 'Need vegetarian food options'" className="w-full p-3 rounded-2xl text-gray-800" rows={2}></textarea>
                        </div>
                    </div>
                     <button onClick={handleSearchClick} className="w-full md:w-auto mt-6 bg-orange-500 text-white font-bold py-3 px-12 rounded-full hover:bg-orange-600 transition duration-300 text-lg">
                        Find Destination
                    </button>
                </div>
                <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                    {Object.entries(categories).map(([name, icon]) => (
                        <a 
                           key={name}
                           href="#" 
                           className={`flex items-center text-white py-2 px-4 rounded-full text-sm font-semibold transition duration-300 ${activeCategory === name ? 'bg-white/40 ring-2 ring-white' : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'}`}
                           onClick={(e) => { e.preventDefault(); setActiveCategory(name); }}
                        >
                            {icon} {name}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * A card component to display a destination image and name.
 * @param {{ imageUrl: string, name: string }} props - The props for the component.
 * @param {string} props.imageUrl - The URL of the destination image.
 * @param {string} props.name - The name of the destination.
 */
const DestinationCard = ({ imageUrl, name }: { imageUrl: string; name: string; }) => (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
        <img src={imageUrl} alt={name} className="w-full h-80 object-cover card-img" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{name}</h3>
    </div>
);

const TrendingDestinations = () => {
    const destinations = [
        { name: 'Europe', imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop' },
        { name: 'Kerala', imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop' },
        { name: 'Bali', imageUrl: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1925&auto=format&fit=crop' },
        { name: 'Kashmir', imageUrl: 'https://images.unsplash.com/photo-1595815772820-6815ce1894a3?q=80&w=2070&auto=format&fit=crop' },
        { name: 'Vietnam', imageUrl: 'https://images.unsplash.com/photo-1593189569773-7c2a7c067a9f?q=80&w=1964&auto=format&fit=crop' },
    ];

    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Top Trending Destinations</h2>
                <p className="text-center text-gray-600 mt-2">Explore the hottest travel spots around the globe.</p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {destinations.map(dest => <DestinationCard key={dest.name} {...dest} />)}
                </div>
            </div>
        </section>
    );
};

const PromoBanner = () => (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1505916349662-757a976135b4?q=80&w=2070&auto=format&fit=crop" alt="Promo banner" className="absolute h-full w-full object-cover opacity-30" />
            <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-3xl font-bold">Grab Up to <span className="text-yellow-400">₹1,500 OFF*</span></h2>
                    <p className="mt-2 text-lg">on Your Next Getaway with AI Planning!</p>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm border-2 border-dashed border-white rounded-lg px-6 py-2">
                        <span className="text-white font-bold text-lg">Use Code: <span className="text-yellow-300">AITRAVEL25</span></span>
                    </div>
                    <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Know More
                    </button>
                </div>
            </div>
        </div>
    </section>
);

const FloatingButtons = () => (
    <div className="fixed bottom-6 right-6 space-y-4 z-40">
        <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition transform hover:scale-110">
            <ChatIcon />
        </button>
        <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-110">
            Plan Your Trip
        </button>
    </div>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p>&copy; 2025 TripGenie. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">Crafting unforgettable journeys with the power of AI.</p>
        </div>
    </footer>
);

// This component injects the global styles into the document's head
const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
        }
        .hero-bg {
            background-image: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
        }
        .card-img {
            transition: transform 0.3s ease-in-out;
        }
        .card-img:hover {
            transform: scale(1.05);
        }
    `}</style>
);

const LocationCard = ({ location, onSelect }: { location: Location; onSelect: () => void }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2">
            <img className="h-56 w-full object-cover" src={location.image} alt={`Image of ${location.place}`} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{location.place}</h3>
                <p className="text-gray-600 text-base flex-grow">{location.description}</p>
                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Estimated Cost:</p>
                    <p className="text-indigo-600 font-bold text-lg">{location.cost}</p>
                </div>
                 <button 
                    onClick={onSelect}
                    className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
                    Select Plan
                </button>
            </div>
        </div>
    );
};

const TripResults = ({ isLoading, error, tripPlan }: { 
    isLoading: boolean; 
    error: string | null; 
    tripPlan: ApiResponse | null 
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
                    <div className="mt-2 text-sm">
                        <p>Debug info:</p>
                        <p>• Check if backend is running on port 8080</p>
                        <p>• Check browser console for more details</p>
                        <p>• Try refreshing the page</p>
                    </div>
                </div>
             </section>
        );
    }

    if (!tripPlan || !tripPlan.response || tripPlan.response.locations.length === 0) {
        return null; // Don't render anything if there's no plan yet
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">We found these amazing destinations for you!</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {tripPlan.response.locations.map((location: Location) => (
                   <LocationCard 
                        key={location.place} 
                        location={location} 
                        onSelect={() => console.log("Selected:", location.place)}
                    />
               ))}
            </div>
        </section>
    );
};

// --- Main App Component ---
// This is the default export that will be rendered.
export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tripPlan, setTripPlan] = useState<ApiResponse | null>(null);

    const handleSearch = async (formData: TripFormData) => {
        console.log('Starting search with data:', formData);
        setIsLoading(true);
        setError(null);
        setTripPlan(null); // Clear previous results

        const requestBody = {
            user_id: 101,
            is_international_travel: true, // Simplified for now
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
        
        console.log('Request body:', requestBody);
        
        try {
            console.log('Making API call to:', 'http://localhost:8080/tripPlanner/findDestination');
            // NOTE: This is a call to a local server.
            // It will only work if you have a server running on localhost:8080.
            const response = await fetch('http://localhost:8080/tripPlanner/findDestination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const data: ApiResponse = await response.json();
            console.log('API Response:', data);
            setTripPlan(data);
        } catch (e) {
            console.error("Search failed:", e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred');
        } finally {
            // This block ensures the loader is turned off regardless of success or failure.
            setIsLoading(false);
        }
    };

    return (
        <>
            <ExternalResourcesLoader />
            <GlobalStyles />
            <Header />
            <main>
                <Hero onSearch={handleSearch} />
                <TripResults isLoading={isLoading} error={error} tripPlan={tripPlan} />
                <TrendingDestinations />
                <PromoBanner />
            </main>
            <FloatingButtons />
            <Footer />
        </>
    );
}
