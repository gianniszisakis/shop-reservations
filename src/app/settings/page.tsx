"use client";

import Header from "@/components/header/header";
import SettingsPage from "@/components/settings/settings-page";
import { useAppointments } from "@/features/appointments/queries";
import { useAppointmentStats } from "@/features/appointments/use-appointments-stats";

export default function Settings() {
  const { data: appointments, isLoading, isError } = useAppointments();

  const { activeAppointments, todayAppointments } =
    useAppointmentStats(appointments);

  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="Ρυθμίσεις"
        avatarImgUrl="/images/after-glow-logo.jpg"
        avatarAlt="After Glow Logo"
        calendarColor="text-pink-600"
        infoTextboxBgColor="bg-pink-50"
        textInfoOne={`${activeAppointments.length} ${
          activeAppointments.length > 1 ? "ενεργά" : "ενεργό"
        } ραντεβού`}
        textInfoTwo={`Σήμερα: ${todayAppointments.length} ραντεβού`}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="mx-5 sm:mx-10">
        <SettingsPage />
      </div>
    </>
  );
}
