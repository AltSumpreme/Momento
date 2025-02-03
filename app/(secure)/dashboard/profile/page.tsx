"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { ENDPOINTS } from "@/utils/apiConfig";
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

  return (
    <div className="bg-black text-white">
      <nav className="flex justify-between center p-2 border-b border-white/20">
        <Link className="flex center text-blue-500 hover:underline" href="/dashboard">
        <ChevronLeft size={20} />
          Go Back
        </Link>
        <h1 className="font-bold">Profile</h1>
        <button className="bg-red-500 p-1 px-3 rounded-full font-medium" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="size-screen">
        <div className="h-24 w-24 bg-white">

        </div>
        <p>User ID: {data.id}</p>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Role: {data.role}</p>
      </div>
    </div>
  );
}
