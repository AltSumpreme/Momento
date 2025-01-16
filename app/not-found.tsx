"use client";
import Link from "next/link";

const CustomErrorPage = () => {
  return (
    <div className="center flex-col size-screen bg-black text-white p-8 justify-center items-center">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Oops! You are at the wrong room for party.
        </span>
      </h1>
      <p className="mb-8 text-lg text-center text-white/80">
        Let's get you back to the
        fun!
      </p>
      <Link
        href="/"
        className="bg-black hover:bg-white/20 border border-white/20 font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform"
      >
        Return Home
      </Link>
    </div>
  );
};

export default CustomErrorPage;
