"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/utils/apiConfig";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";

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
    <div className="flex h-full min-h-screen w-screen bg-black text-white bg-[radial-gradient(circle_at_bottom,_#0a0a23_30%,_black_80%)] bg-fixed">
      <div className="w-3/4">
      Events and Stuff
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
              Hello {data.name}
            </p>
            <Link
              className="bg-white/10 rounded-lg p-2 w-full block text-center mt-6 hover:bg-white/20 duration-300"
              href="/dashboard/profile"
            >
              View Profile
            </Link>
          </div>
          <button
            className="w-full bg-red-500/10 hover:bg-red-500/20 rounded-lg p-2 duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
