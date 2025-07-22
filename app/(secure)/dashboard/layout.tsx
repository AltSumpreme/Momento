"use client";

import { profileGradient } from "@/utils/profile-picture";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { ENDPOINTS } from "@/utils/api-config";

type Event = {
  id: string;
  title: string;
  description: string;
  eventDateTime: string;
  location: string;
  userId: string;
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [data, setData] = useState({ id: "", name: "", email: "", role: "" });
  const [bookings, setBookings] = useState<{ id: string; event: Event }[]>([]);

  const token = getCookie("token");

 const fetchUserBookings = useCallback(() => {
  axios
    .get(ENDPOINTS.GET_BOOKINGS, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: 1, limit: 10 },
    })
    .then((res) => {
      setBookings(res.data);
    })
    .catch((error) => {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    });
}, [token]);
  useEffect(() => {
    axios
      .get(ENDPOINTS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        fetchUserBookings();
      })
      .catch(() => {
        deleteCookie("token");
        router.push("/login");
      });
  }, [router, token, fetchUserBookings]);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white bg-[radial-gradient(circle_at_bottom,_#0a0a23_30%,_black_80%)] bg-fixed">
      <div className="flex flex-col w-3/4 p-4">{children}</div>
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
            <div className="size-full bg-white/5 rounded-lg ring-1 ring-white/10 p-2">
              {bookings.length > 0 ? (
                <div className="max-h-72 overflow-y-auto">
                  {bookings.map((booking, index) => (
                    <div key={booking.id}>
                      <div className="p-3 rounded-md hover:bg-white/10 transition duration-300">
                        <h2 className="font-semibold text-white text-sm">
                          {booking.event.title}
                        </h2>
                        <p className="text-xs text-white/70">
                          {booking.event.location}
                        </p>
                        <p className="text-xs text-white/60">
                          {new Date(
                            booking.event.eventDateTime
                          ).toLocaleString()}
                        </p>
                      </div>
                      {index < bookings.length - 1 && (
                        <div className="h-px bg-white/10 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="size-full center flex-col text-white/40">
                  <Calendar strokeWidth={1} size={75} />
                  <div className="text-md">No bookings planned.</div>
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
