import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/utils/api-config";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function getEvents() {
  const router = useRouter();
  const [events, setEvents] = useState({});
  const token = getCookie("token");

  const fetchEvents = () => {
    useEffect(() => {
      axios
        .get(ENDPOINTS.GETEVENTS, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEvents(res.data))
        .catch(() => {
          deleteCookie("token");
          router.push("/login");
        });
    }, [router, token]);
  };

  return { events, fetchEvents };
}
