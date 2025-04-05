"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { ENDPOINTS } from "@/utils/api-config";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function UserProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({ id: "", name: "", email: "", role: "" });
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
    <div className="bg-black text-white flex flex-col size-screen">
      <nav className="flex justify-between center p-2 border-b border-white/20">
        <Link
          className="flex center text-blue-500 hover:underline"
          href="/dashboard"
        >
          <ChevronLeft size={20} />
          Go Back
        </Link>
        <h1 className="font-bold">Profile</h1>
        <button
          className="bg-red-500 p-1 px-4 rounded-full font-semibold hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="size-full center">
        <div className="center flex-col bg-white/5 w-96 p-10 rounded-lg  ring-1 ring-white/10">
          <div
            className="w-24 aspect-square rounded-full flex items-center justify-center"
            style={{ background: gradient }}
          />
          <div className="center flex-col mt-4 space-y-2">
            <p className="p-2 border border-white/10 rounded-md">
              Name: {data.name}
            </p>
            <p className="p-2 border border-white/10 rounded-md">
              Email: {data.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
