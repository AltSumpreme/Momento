import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/utils/api-config";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export function useEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useLocalStorage(
    "selectedEvent",
    ""
  );
  const token = getCookie("token");

  const selectedEvent = events?.find(
    (event: { id: string }) => event.id === selectedEventId
  );

  const fetchEvents = async () => {
    try {
      const res = await axios.get(ENDPOINTS.GET_EVENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch {
      deleteCookie("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, selectedEvent, setSelectedEventId, fetchEvents };
}
