"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { setToken } from "@/utils/auth";
import { ENDPOINTS } from "@/utils/apiConfig";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(ENDPOINTS.SIGNUP, {
        name,
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
        <h1 className="text-3xl font-bold text-white/80 mb-6">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 text-white/80 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          Sign Up
        </button>
        <Link href="/login" className="block text-center mt-4 text-white/80 hover:text-white duration-300">
          Already have an account? Login
        </Link>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
