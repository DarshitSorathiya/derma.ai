"use client";
import React, { useState } from "react";

const TimeSlotSelector = ({ startHour = 9, endHour = 18, slotDuration = 40 }) => {
  // slotDuration is in minutes
  const [selectedSlot, setSelectedSlot] = useState("");

  // Generate time slots based on the start/end hour and slot duration
  const generateTimeSlots = () => {
    const slots = [];
    let startTime = startHour * 60; // convert to minutes
    const endTime = endHour * 60; // convert to minutes

    while (startTime + slotDuration <= endTime) {
      const startHH = Math.floor(startTime / 60);
      const startMM = startTime % 60;
      const endSlot = startTime + slotDuration;
      const endHH = Math.floor(endSlot / 60);
      const endMM = endSlot % 60;

      // Format hours and minutes to display in HH:MM format
      const formattedStart = `${startHH}:${startMM < 10 ? "0" : ""}${startMM}`;
      const formattedEnd = `${endHH}:${endMM < 10 ? "0" : ""}${endMM}`;

      slots.push(`${formattedStart} - ${formattedEnd}`);
      startTime = endSlot; // next slot starts at the end of the current slot
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="timeSlot">
        Time Slot
      </label>
      <select
        id="timeSlot"
        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        required
      >
        <option value="">Select a time slot</option>
        {timeSlots.map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSlotSelector;
