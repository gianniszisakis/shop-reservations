"use client";

import { Clock3, User } from "lucide-react";

import type { Appointment } from "@/features/appointments/types";

interface CalendarAppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export default function CalendarAppointmentCard({
  appointment,
  onClick,
}: CalendarAppointmentCardProps) {
  const startTime = new Intl.DateTimeFormat("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Athens",
  }).format(new Date(appointment.startDateTime));

  const endTime = new Intl.DateTimeFormat("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Athens",
  }).format(new Date(appointment.endDateTime));

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border bg-card p-4 text-left shadow-sm transition hover:border-pink-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-pink-500" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">{appointment.customer.fullName}</p>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              <span>
                {startTime} – {endTime}
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />

            <span className="truncate">
              {appointment.services
                .map(({ service }) => service.name)
                .join(" - ")}
            </span>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            {appointment.source.name}
          </div>
        </div>
      </div>
    </button>
  );
}
