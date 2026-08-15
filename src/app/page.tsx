"use client";
import Header from "@/components/header/header";
import { LatestBookingsSection } from "@/components/latest-bookings/latest-bookings-section";
import { useAppointments } from "@/features/appointments/queries";
import { useMemo } from "react";

export default function Home() {
  const { data: appointments, isLoading, isError } = useAppointments();

  const { activeAppointments, todayAppointments } = useMemo(() => {
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

  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="After Glow Ραντεβού"
        avatarImgUrl="/images/after-glow-logo.jpg"
        avatarAlt="After Glow Logo"
        calendarColor="text-pink-600"
        infoTextboxBgColor="bg-pink-50"
        textInfoOne={`${activeAppointments?.length} ενεργά ραντεβού`}
        textInfoTwo={`Σήμερα: ${todayAppointments?.length} ραντεβού`}
        isLoading={isLoading}
        isError={isError}
      />
      <div className="mx-5 sm:mx-10">
        <LatestBookingsSection />
      </div>
    </>
  );
}
