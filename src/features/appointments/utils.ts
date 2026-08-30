import type { Appointment } from "./types";

export function getAppointmentStatus(
  appointment: Appointment,
  now: Date,
): Appointment["status"] {
  if (appointment.status !== "CONFIRMED") {
    return appointment.status;
  }

  const endDateTime = new Date(appointment.endDateTime);

  if (endDateTime <= now) {
    return "COMPLETED";
  }

  return "CONFIRMED";
}

export const appointmentStatusMap = {
  CONFIRMED: {
    label: "Επιβεβαιωμένο",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  COMPLETED: {
    label: "Ολοκληρωμένο",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  CANCELLED: {
    label: "Ακυρωμένο",
    className: "border-red-200 bg-red-50 text-red-700",
  },
} as const;
