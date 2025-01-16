"use client";
import React, { useState, useEffect } from "react";

interface Place {
  city: string;
  events: number;
}

interface Location {
  region: string;
  places: Place[];
}

interface Category {
  category: string;
  events: number;
}

// Mock for now, will setup API later.
const fetchData = async () => {
  return {
    locations: [
      {
        region: "Asia & Pacific",
        places: [
          { city: "Bangkok", events: 6 },
          { city: "Bengaluru", events: 15 },
          { city: "Dubai", events: 9 },
          { city: "Istanbul", events: 5 },
          { city: "Hong Kong", events: 3 },
          { city: "Jakarta", events: 4 },
          { city: "Kuala Lumpur", events: 2 },
          { city: "Manila", events: 2 },
          { city: "Melbourne", events: 4 },
          { city: "Mumbai", events: 5 },
          { city: "New Delhi", events: 5 },
          { city: "Seoul", events: 4 },
          { city: "Singapore", events: 10 },
          { city: "Sydney", events: 5 },
          { city: "Taipei", events: 3 },
          { city: "Tokyo", events: 15 },
        ],
      },
      {
        region: "Europe",
        places: [
          { city: "Amsterdam", events: 7 },
          { city: "Barcelona", events: 14 },
          { city: "Berlin", events: 17 },
          { city: "Brussels", events: 5 },
          { city: "Helsinki", events: 4 },
          { city: "Istanbul", events: 8 },
          { city: "Lisbon", events: 7 },
          { city: "London", events: 23 },
          { city: "Madrid", events: 8 },
          { city: "Milan", events: 2 },
          { city: "Munich", events: 10 },
          { city: "Paris", events: 8 },
          { city: "Stockholm", events: 6 },
          { city: "Zurich", events: 7 },
        ],
      },
      {
        region: "Americas",
        places: [
          { city: "Atlanta", events: 4 },
          { city: "Austin", events: 15 },
          { city: "Boston", events: 10 },
          { city: "Buenos Aires", events: 2 },
          { city: "Chicago", events: 7 },
          { city: "Denver", events: 5 },
          { city: "Houston", events: 3 },
          { city: "Los Angeles", events: 21 },
          { city: "Mexico City", events: 7 },
          { city: "Miami", events: 17 },
          { city: "Montréal", events: 5 },
          { city: "New York", events: 53 },
          { city: "Philadelphia", events: 5 },
          { city: "Phoenix", events: 4 },
          { city: "Salt Lake City", events: 8 },
          { city: "San Diego", events: 8 },
          { city: "San Francisco", events: 59 },
          { city: "São Paulo", events: 5 },
          { city: "Seattle", events: 12 },
          { city: "Toronto", events: 24 },
          { city: "Vancouver", events: 12 },
          { city: "Washington, DC", events: 5 },
        ],
      },
      {
        region: "Africa",
        places: [
          { city: "Cape Town", events: 7 },
          { city: "Nairobi", events: 5 },
        ],
      },
    ],
    categories: [
      { category: "Arts & Culture", events: 641 },
      { category: "Climate", events: 305 },
      { category: "Fitness", events: 437 },
      { category: "Wellness", events: 809 },
      { category: "Crypto", events: 770 },
      { category: "Tech", events: 1023 },
    ],
  };
};

export default function DiscoverPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setLocations(data.locations);
      setCategories(data.categories);
      setSelectedRegion(data.locations[0].region);
    };
    getData();
  }, []);

  const selectedLocationData = selectedRegion
    ? locations.find((region) => region.region === selectedRegion)
    : null;

  return (
    <div className="center">
      <div className="w-[800px] py-12">
        <div className="px-2">
          <h1 className="text-3xl font-bold mb-4">Discover Events</h1>
          <p className="mb-14 text-white/80">
            Explore popular events near you, browse by category, or check out
            some of the great community calendars.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Explore Local Events</h2>
          <div className="flex gap-2 mb-8">
            {locations.map((region) => (
              <button
                key={region.region}
                onClick={() => setSelectedRegion(region.region)}
                className={`px-3 py-1 rounded-md duration-300 hover:text-white/80 text-white/80 ${
                  selectedRegion === region.region
                    ? "hover:text-white bg-white/10"
                    : "hover:bg-white/5 text-white/60"
                }`}
              >
                {region.region}
              </button>
            ))}
          </div>
        </div>

        {selectedLocationData && (
          <div className="grid grid-cols-4 gap-4 text-nowrap">
            {selectedLocationData.places.map((place) => (
              <div
                key={place.city}
                className="flex items-center duration-300 hover:bg-white/10 p-2 rounded-xl"
              >
                <div className="h-full center mr-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{place.city}</p>
                  <p className="text-sm text-white/60">{place.events} Events</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="px-2">
          <div className="h-[1px] my-16 bg-white/20 rounded-full"></div>
          <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map(({ category, events }) => (
              <div
                key={category}
                className="p-4 rounded-xl flex flex-col bg-white/10 duration-300 hover:bg-white/15 border border-white/5"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
                <p className="font-semibold">{category}</p>
                <p className="text-white/60">{events} Events</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
