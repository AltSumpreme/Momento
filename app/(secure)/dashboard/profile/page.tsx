"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { ENDPOINTS } from "@/utils/apiConfig";
import Link from "next/link";

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
    <div className="center flex-col size-screen">
      <h1>User Profile Page</h1>
      <div>
        <p>User ID: {data.id}</p>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Role: {data.role}</p>
      </div>

      <Link className="bg-blue-500 p-2" href="/dashboard">
        Go Back
      </Link>
      <button className="bg-red-500 p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
