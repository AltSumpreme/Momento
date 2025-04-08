"use client";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import EventList from "@/app/components/EventList";
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
            href="/dashboard/event/create"
            className=" text-white/80 hover:text-white duration-300 group"
          >
            Create Event
          </Link>
        </div>
      </div>
      <div className="flex justify-center pt-14 overflow-y-scroll h-full">
        <div className="size-full overflow-y-scroll flex flex-col w-[800px]">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <EventList events={events} />
        </div>
      </div>
    </>
  );
}
