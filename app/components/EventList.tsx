import Link from "next/link";
import { useEvents } from "@/hooks/use-events";
import { profileGradient } from "@/utils/profile-picture";

type Event = {
  id: string;
  title: string;
  description: string;
  eventDateTime: string;
  location: string;
  userId: string;
};

const EventList = ({ events }: { events: Event[] }) => {
  const { setSelectedEventId } = useEvents();

  return (
    <div className="grid grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-4 rounded-xl flex flex-col bg-white/10 duration-300 hover:bg-white/15 border border-white/5"
        >
          <div
            className="w-12 h-12 bg-gray-300 rounded-full mb-2"
            style={{ background: profileGradient(event) }}
          ></div>
          <p className="font-semibold text-lg">{event.title}</p>
          <p className="text-white/60 line-clamp-2">{event.description}</p>
          <p className="text-white/40 text-sm mt-1">
            {new Date(event.eventDateTime).toLocaleDateString()}
          </p>
          <Link
            href={`/dashboard/event/${event.id}`}
            className="mt-2 text-sm text-white/80 hover:underline"
            onClick={() => {
              setSelectedEventId(event.id);
            }}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventList;
