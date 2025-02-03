"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="center py-12">
      <div className="w-[900px] center">
        <div className="w-1/2 flex flex-col items-start justify-center space-y-6 leading-none">
          <h1 className="text-2xl font-bold text-white/80">Momento</h1>
          <h2 className="text-6xl font-extrabold leading-none tracking-wide">
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
          <Link
            href="/login"
            className="px-6 py-3 text-black bg-white rounded-lg font-semibold hover:bg-white/90 duration-300"
          >
            Create Your First Event
          </Link>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="h-[500px] w-[400px] bg-white/20 rounded-lg flex items-center justify-center">
            Placeholder for some decor stuff
          </div>
        </div>
      </div>
    </div>
  );
}
