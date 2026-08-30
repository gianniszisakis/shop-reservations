import { useMemo } from "react";

import type { Appointment } from "./types";

export function useAppointmentStats(appointments: Appointment[] | undefined) {
  return useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    const confirmedAppointments =
      appointments?.filter(
        (appointment) => appointment.status === "CONFIRMED",
      ) ?? [];

    return {
      activeAppointments: confirmedAppointments.filter(
        (appointment) => appointment.startDateTime.split("T")[0] >= today,
      ),

      todayAppointments: confirmedAppointments.filter(
        (appointment) => appointment.startDateTime.split("T")[0] === today,
      ),
    };
  }, [appointments]);
}
