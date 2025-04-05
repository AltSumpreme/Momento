"use client";

import React, { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/utils/api-config";
import { getCookie } from "cookies-next";

const CreateEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [location, setLocation] = useState("");

  const token = getCookie("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        ENDPOINTS.CREATE_EVENT,
        {
          title,
          description,
          eventDateTime,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event created successfully");
      setTitle("");
      setDescription("");
      setEventDateTime("");
      setLocation("");
    } catch (error) {
      alert("Failed to create event");
    }
  };

  return (
    <div className="size-full text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 rounded-xl ring-1 ring-white/10 p-6 space-y-4"
      >
        <h1 className="text-xl font-bold text-white/80">Create Event</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/10 p-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/10 p-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          required
        />

        <input
          type="datetime-local"
          value={eventDateTime}
          onChange={(e) => setEventDateTime(e.target.value)}
          className="w-full bg-white/10 p-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-white/10 p-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          required
        />

        <button
          type="submit"
          className="w-full bg-white/10 hover:bg-white/20 text-white p-2 rounded-md font-semibold duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
