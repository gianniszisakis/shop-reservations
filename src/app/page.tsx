"use client";
import DashboardCalendar from "@/components/dashboard-calendar/dashboard-calendar";
import Header from "@/components/header/header";
import { LatestBookingsSection } from "@/components/latest-bookings/latest-bookings-section";
import { useAppointments } from "@/features/appointments/queries";
import { useAppointmentStats } from "@/features/appointments/use-appointments-stats";

export default function Home() {
  const { data: appointments, isLoading, isError } = useAppointments();

  const { activeAppointments, todayAppointments } =
    useAppointmentStats(appointments);

  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="After Glow Ραντεβού"
        avatarImgUrl="/images/after-glow-logo.jpg"
        avatarAlt="After Glow Logo"
        calendarColor="text-pink-600"
        infoTextboxBgColor="bg-pink-50"
        textInfoOne={`${activeAppointments?.length} ${activeAppointments?.length > 1 ? "ενεργά" : "ενεργό"} ραντεβού`}
        textInfoTwo={`Σήμερα: ${todayAppointments?.length} ραντεβού`}
        isLoading={isLoading}
        isError={isError}
      />
      <div className="mx-5 sm:mx-10">
        <LatestBookingsSection />

        <DashboardCalendar />
      </div>
    </>
  );
}
