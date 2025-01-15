"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getToken, removeToken } from "@/utils/auth";
import { ENDPOINTS } from "@/utils/apiConfig";

export default function SecurePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(ENDPOINTS.SECURE, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data.message))
      .catch(() => {
        removeToken();
        router.push("/");
      });
  }, [router, token]);

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

  return (
    <div>
      <h1>Secure Page</h1>
      <p>{data}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
