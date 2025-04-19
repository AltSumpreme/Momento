"use client";

import { useEvents } from "@/hooks/use-events";
import { ENDPOINTS } from "@/utils/api-config";
import { profileGradient } from "@/utils/profile-picture";
import { getCookie } from "cookies-next";
import { MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const EventPage = () => {
  const { eventId } = useParams();
  const [status, setStatus] = useState("");
  const { selectedEvent } = useEvents();

  const handleBooking = async () => {
    const token = getCookie("token");

    const res = await fetch(ENDPOINTS.BOOK_EVENT + `/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || "Booking failed");
    } else {
      setStatus("Booking successful");
    }
  };

  const date = new Date(selectedEvent?.eventDateTime!);
  const formatted = date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="size-full overflow-hidden flex flex-col justify-between p-10 text-white">
      <div className="space-y-6">
        <div className="bg-white/5 ring-1 ring-white/10 rounded-xl p-6 flex justify-between items-center">
          <div className="flex justify-start items-center space-x-4">
            <div
              className="w-12 h-12 bg-gray-300 rounded-full"
              style={{ background: profileGradient({id: selectedEvent?.id || "dsfvsdfvdsf"}) }}
            ></div>
            <h1 className="text-4xl font-bold text-white">
              {selectedEvent?.title}
            </h1>
          </div>
          <div>
            <p className="text-white/70 text-md flex w-full justify-end items-center mt-1">
              <MapPin className="inline mr-1" size={16} />
              {selectedEvent?.location}
            </p>
            <p className="text-white/60 text-md mt-1">{formatted}</p>
          </div>
        </div>

        {/* <div className="bg-white/5 ring-1 ring-white/10 rounded-xl p-6 space-y-4"> */}
          <p className="text-white/80 text-lg">{selectedEvent?.description}</p>
        {/* </div> */}
      </div>

      <div className="mt-10 space-y-4">
        {status && <p className="text-white/40 text-center">{status}</p>}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-white/80 font-semibold py-4 rounded-lg text-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventPage;
