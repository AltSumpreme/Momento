"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full min-h-screen w-screen bg-black text-white">
      <div className="sticky top-0 flex items-center justify-between p-4 px-6 bg-black/50 backdrop-blur-md z-10">
        <Link href="/" className="text-lg font-bold text-white/80">M.</Link>
        <div className="flex space-x-4 font-semibold text-sm">
          <Link
            href="/discover"
            className="center text-white/80 hover:text-white duration-300 group"
          >
            Discover Events
            <ArrowUpRightIcon
              className="translate-x-[1px] group-hover:-translate-x-[0.5px] duration-300"
              size={16}
            />
          </Link>

          <Link
            href="/login"
            className="py-1 px-3 text-white/80 hover:text-white rounded-full bg-white/20 hover:bg-white/30 duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {children}

      <div className="px-36 py-12">
        <div className="h-[1px] mb-4 bg-white/20 rounded-full"></div>

        <div className="flex justify-between items-center py-4 text-white/80">
          <div className="space-x-6">
            <span className="font-bold text-white">Momento</span>
            <span>What&apos;s New</span>
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
