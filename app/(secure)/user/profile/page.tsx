"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { ENDPOINTS } from "@/utils/apiConfig";
import Link from "next/link";

export default function UserProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    axios
      .get(ENDPOINTS.SECURE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data.user))
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
      <p>User Data: {JSON.stringify(data)}</p>
      <Link className="bg-blue-500 p-2" href="/user">
        Go Back
      </Link>
      <button className="bg-red-500 p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
