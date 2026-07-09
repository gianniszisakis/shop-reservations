"use client";
import { useState } from "react";
import { LatestBookingCard } from "./latest-booking-card";
import { Eye, EyeOff } from "lucide-react";

export function LatestBookingsSection() {
  const [showSection, setShowSection] = useState(true);

  return (
    <>
      <div className="my-4 flex items-center">
        <h1 className="text-3xl font-bold tracking-tight">Επόμενα Ραντεβού</h1>

        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-muted"
          aria-label="Προβολή"
          onClick={() => setShowSection(!showSection)}
        >
          {showSection ? (
            <Eye className="h-6 w-6" />
          ) : (
            <EyeOff className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className={`${showSection ? "block" : "hidden"}`}>
        <LatestBookingCard />
        <LatestBookingCard />
        <LatestBookingCard />
      </div>
    </>
  );
}
