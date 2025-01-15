"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  

  return (
    <div className="h-full min-h-screen w-screen bg-black text-white">
      <div className="flex items-center justify-between p-4 px-6 text-white">
        <div className="text-lg font-bold">M.</div>
        <div className="flex space-x-4 font-semibold text-sm">
          <button className=" flex items-center text-white/80 hover:text-white duration-300">
            Discover Events <ArrowUpRightIcon className="ml-1" size={16} />
          </button>
          <Link href="/login" className="flex items-center text-white/80 hover:text-white duration-300">
          <button
            className="py-1 px-3 text-white/80 hover:text-white rounded-full bg-white/20 hover:bg-white/30 duration-300"
          >
            Login
          </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-36 py-12">
        <div className="w-1/2 flex flex-col items-start justify-center space-y-6 leading-none">
          <h1 className="text-2xl font-bold text-white/80">Momento</h1>
          <h2 className="text-6xl font-extrabold leading-tight">
            Delightful
            <br />
            events
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              start here.
            </span>
          </h2>
          <p className="text-xl max-w-[25rem] text-white/80">
            Set up an event page, invite friends and sell tickets. Host a
            memorable event today.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 text-black bg-white rounded-lg font-semibold hover:bg-white/90 duration-300"
          >
            Create Your First Event
          </button>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="h-[500px] w-[400px] bg-white/20 rounded-lg flex items-center justify-center">
            Placeholder for some decor stuff
          </div>
        </div>
      </div>

      <div className="px-36 py-12">
        <div className="h-[1px] mb-4 bg-white/20 rounded-full"></div>

        <div className="flex justify-between items-center py-4 text-white/80">
          <div className="space-x-6">
            <span className="font-bold text-white">Momento</span>
            <span>What's New</span>
            <span>Discover</span>
            <span>Pricing</span>
            <span>Help</span>
          </div>

          <div className="space-x-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
}


