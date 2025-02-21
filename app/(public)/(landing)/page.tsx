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
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <g clipPath="url(#clip0_234_854)">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M44 0H0V150C0 177.614 22.3858 200 50 200H94V50C94 22.3858 71.6142 0 44 0ZM156 0C128.386 0 106 22.3858 106 50V200H150C177.614 200 200 177.614 200 150V0H156Z"
                fill="url(#paint0_linear_234_854)"
              />{" "}
            </g>{" "}
            <defs>
              {" "}
              <linearGradient
                id="paint0_linear_234_854"
                x1="100"
                y1="0"
                x2="100"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop stopColor="#60a5fa" />{" "}
                <stop offset="1" stopColor="#2563eb" />{" "}
              </linearGradient>{" "}
              <clipPath id="clip0_234_854">
                {" "}
                <rect width="200" height="200" fill="white" />{" "}
              </clipPath>{" "}
            </defs>{" "}
          </svg>
        </div>
      </div>
    </div>
  );
}
