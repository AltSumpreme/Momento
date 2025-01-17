"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "cookies-next";
import { ENDPOINTS } from "@/utils/apiConfig";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInput = (): boolean => {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return false;
    }
    if (name.length < 3) {
      setMessage("Name must be at least 3 characters long.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      setMessage("Signing up...");

      const res = await axios.post(ENDPOINTS.SIGNUP, {
        name,
        email,
        password,
      });

      if (res.data.token) {
        setCookie("token", res.data.token, { path: "/", maxAge: 60 * 60 });
        setMessage("");
        router.push("/user");
      } else {
        setMessage("Sign up failed. Please try again.");
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setMessage("Invalid input. Please check your details.");
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
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
          type="email"
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
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full py-2 text-black bg-white rounded-md hover:bg-gray-100 duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <Link
          href="/login"
          className="block text-center mt-4 text-white/80 hover:text-white duration-300"
        >
          Already have an account? Login
        </Link>

        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </div>
    </div>
  );
}
