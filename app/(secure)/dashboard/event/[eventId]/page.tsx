"use client";

import { useEvents } from "@/hooks/use-events";
import { ENDPOINTS } from "@/utils/api-config";
import { getCookie } from "cookies-next";
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

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Book Event</h1>
      <h3>{selectedEvent?.title}</h3>
      <p>{selectedEvent?.description}</p>
      <p>{selectedEvent?.location}</p>
      <p>{selectedEvent?.eventDateTime}</p>
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EventPage;
