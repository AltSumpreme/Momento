"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/utils/apiConfig";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { ArrowUpRightIcon, Calendar } from "lucide-react";

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

export default function UserPage() {
  const router = useRouter();

  const [data, setData] = useState({ id: "", name: "", email: "", role: "" });
  const [events, setEvents] = useState({});
  const token = getCookie("token");

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

  useEffect(() => {
    axios
      .get(ENDPOINTS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => {
        deleteCookie("token");
        router.push("/login");
      });
  }, [router, token]);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  const hashStringToHsl = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    const s = 70;
    const l = 50;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const gradient =
    data.id &&
    `linear-gradient(135deg, ${hashStringToHsl(data.id)}, ${hashStringToHsl(
      data.id + "salt"
    )})`;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white bg-[radial-gradient(circle_at_bottom,_#0a0a23_30%,_black_80%)] bg-fixed">
      <div className="flex flex-col w-3/4 p-4">
        <div className="flex justify-between items-center text-white/80">
          {/* {Navbar} */}
          <Link
            href="/"
            className="text-lg font-bold text-white/80 hover:text-white duration-300"
          >
            Momento
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/discover"
              className="center text-white/80 hover:text-white duration-300 group"
            >
              Discover Events
              <ArrowUpRightIcon
                className="translate-x-[1px] group-hover:-translate-x-[0.5px] duration-300"
                size={16}
              />
            </Link>
            <Link
              href="/events/create"
              className=" text-white/80 hover:text-white duration-300 group"
            >
              Create Event
            </Link>
          </div>
        </div>
        <div className="size-full overflow-y-scroll flex justify-center">
          {/* WIlL SHOW UPCOMING EVENTS AND THE EVENTS USER BOOKED HERE */}
        </div>
      </div>
      <div className="w-1/4 p-4">
        <div className="size-full bg-white/5 rounded-xl ring-1 ring-white/10 p-4 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <div className="center w-full p-6">
              <div
                className="w-24 aspect-square rounded-full flex items-center justify-center"
                style={{ background: gradient }}
              />
            </div>
            <p className="center font-semibold text-white/80">
              Hello {data.name}!
            </p>
            <Link
              className="bg-white/10 rounded-lg p-2 w-full block text-center mt-6 hover:bg-white/20 duration-300"
              href="/dashboard/profile"
            >
              View Profile
            </Link>
          </div>
          <div className="size-full py-4">
            <div className="center size-full bg-white/5 rounded-lg ring-1 ring-white/10">
              {Object.keys(events).length == 0 && (
                <div className="center flex-col text-white/40 ">
                  <div>
                    {" "}
                    <Calendar strokeWidth={1} size={75} />{" "}
                  </div>
                  <div className="text-md">No events planned.</div>
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full bg-red-500/10 hover:bg-red-500/20 rounded-lg p-2 duration-300 text-red-500/80"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
