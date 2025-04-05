"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/utils/api-config";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { ArrowUpRightIcon, Calendar } from "lucide-react";
import { profileGradient } from "@/utils/profile-picture";

export default function UserPage() {
  const router = useRouter();

  const [data, setData] = useState({ id: "", name: "", email: "", role: "" });
  const [events, setEvents] = useState({});
  const token = getCookie("token");

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
                style={{ background: profileGradient(data) }}
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
