"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAppointmentStats } from "@/features/appointments/use-appointments-stats";
import { useAppointments } from "@/features/appointments/queries";

export default function AppointmentsPage() {
  const [view, setView] = useState<"all" | "active">("all");
  const [search, setSearch] = useState("");

  const { data: appointments, isLoading, isError } = useAppointments();

  const { activeAppointments, todayAppointments } =
    useAppointmentStats(appointments);

  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="Ιστορικό Ραντεβού"
        avatarImgUrl="/images/after-glow-logo.jpg"
        avatarAlt="After Glow Logo"
        calendarColor="text-pink-600"
        infoTextboxBgColor="bg-pink-50"
        textInfoOne={`${activeAppointments?.length} ${activeAppointments?.length > 1 ? "ενεργά" : "ενεργό"} ραντεβού`}
        textInfoTwo={`Σήμερα: ${todayAppointments?.length} ραντεβού`}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="px-3 pb-8 sm:px-5 lg:px-8">
        <div className="w-full space-y-5">
          {/* Page header */}
          <div className="pt-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Όλα τα ραντεβού
            </h1>
          </div>

          {/* Filters */}
          <Card className="rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* View tabs */}
              <div className="grid w-full grid-cols-2 rounded-xl bg-muted/50 p-1 lg:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setView("all")}
                  className={`rounded-lg ${
                    view === "all"
                      ? "bg-white shadow-sm hover:bg-white"
                      : "text-muted-foreground hover:bg-transparent"
                  }`}
                >
                  Όλα
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setView("active")}
                  className={`rounded-lg ${
                    view === "active"
                      ? "bg-white shadow-sm hover:bg-white"
                      : "text-muted-foreground hover:bg-transparent"
                  }`}
                >
                  Ενεργά
                </Button>
              </div>

              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Αναζήτηση πελάτη..."
                  className="h-11 rounded-xl pl-11"
                />
              </div>
            </div>
          </Card>

          {/* Appointments will go here */}
          <div className="space-y-4">{/* LatestBookingCard */}</div>
        </div>
      </div>
    </>
  );
}
