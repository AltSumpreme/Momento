"use client";

import { profileGradient } from "@/utils/profile-picture";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { ENDPOINTS } from "@/utils/api-config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
