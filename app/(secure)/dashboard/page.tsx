"use client";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useEvents } from "@/hooks/get-events";
export default function UserPage() {
  const { events } = useEvents();
  return (
    <>
      <div className="flex justify-between items-center text-white/80">
        {/* {Navbar} */}
        <Link
          href="/"
          className="text-lg font-bold text-white/80 hover:text-white duration-300"
        >
          Momento
        </Link>
        <div className="flex space-x-4">
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
            href="/dashboard/create"
            className=" text-white/80 hover:text-white duration-300 group"
          >
            Create Event
          </Link>
        </div>
      </div>
      <div className="size-full overflow-y-scroll flex justify-center">
        {/* sample output for now */}
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(events, null, 2)}
        </pre>
      </div>
    </>
  );
}
