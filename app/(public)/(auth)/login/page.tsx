"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getToken, setToken } from "@/utils/auth";
import { ENDPOINTS } from "@/utils/apiConfig";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const token = getToken();

  useEffect(() => {
    if (token) {
      router.push("/user");
      return;
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });
      setToken(res.data.token);
      router.push("/user");
    } catch {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="h-full min-h-screen w-screen bg-black text-white flex items-center justify-center">
      <div className="border border-white/20 p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white/80 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 text-white/80 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 text-white/80 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 text-black bg-white rounded-md hover:bg-gray-100 duration-300"
        >
          Login
        </button>
        <Link
          href="/signup"
          className="block text-center mt-4 text-white/80 hover:text-white duration-300"
        >
          Don&apos;t have an account? Sign Up
        </Link>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
