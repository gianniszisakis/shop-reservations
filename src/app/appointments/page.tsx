"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useAppointmentStats } from "@/features/appointments/use-appointments-stats";
import { useAppointments } from "@/features/appointments/queries";
import type { Appointment } from "@/features/appointments/types";

import { LatestBookingCard } from "@/components/latest-bookings/latest-booking-card";
import { LatestBookingCardSkeleton } from "@/components/latest-bookings/latest-booking-card-skeleton";
import ErrorState from "@/components/shared/error-state";
import BackHeader from "@/components/sheet/sheet-header";
import BookingDetails from "@/components/booking/booking-details";

export default function AppointmentsPage() {
  const [view, setView] = useState<"all" | "active">("all");
  const [search, setSearch] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [isSheetOpen, setSheetOpen] = useState(false);

  const { data: appointments, isLoading, isError } = useAppointments();

  const { activeAppointments, todayAppointments } =
    useAppointmentStats(appointments);

  const filteredAppointments = useMemo(() => {
    const searchValue = search.trim().toLocaleLowerCase();

    return (
      appointments
        ?.filter((appointment) => {
          if (view === "active") {
            return appointment.status === "CONFIRMED";
          }

          return true;
        })
        .filter((appointment) => {
          if (!searchValue) {
            return true;
          }

          return (
            appointment.customer?.fullName
              ?.toLocaleLowerCase()
              .includes(searchValue) ||
            appointment.customer?.phone
              ?.toLocaleLowerCase()
              .includes(searchValue) ||
            appointment.customer?.email
              ?.toLocaleLowerCase()
              .includes(searchValue)
          );
        }) ?? []
    );
  }, [appointments, search, view]);

  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="Ιστορικό Ραντεβού"
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

      <div className="px-3 pb-8 sm:px-5 lg:px-8">
        <div className="w-full space-y-5">
          {/* Page header */}
          <div className="pt-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Όλα τα ραντεβού
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Προβολή και διαχείριση όλων των ραντεβού.
            </p>
          </div>

          {/* Filters */}
          <Card className="rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* View */}
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

          {/* Appointments */}
          <div className="space-y-4">
            {isLoading ? (
              <>
                <LatestBookingCardSkeleton />
                <LatestBookingCardSkeleton />
                <LatestBookingCardSkeleton />
              </>
            ) : isError ? (
              <ErrorState message="Αδυναμία φόρτωσης ραντεβού" />
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment: Appointment) => (
                <button
                  key={appointment.id}
                  type="button"
                  className="w-full appearance-none border-0 bg-transparent p-0 text-left"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setSheetOpen(true);
                  }}
                >
                  <LatestBookingCard appointment={appointment} />
                </button>
              ))
            ) : (
              <ErrorState
                title={
                  view === "active"
                    ? "Δεν υπάρχουν ενεργά ραντεβού."
                    : "Δεν υπάρχουν ραντεβού."
                }
                message=""
              />
            )}
          </div>
        </div>
      </div>

      {/* Appointment details */}
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);

          if (!open) {
            setSelectedAppointment(null);
          }
        }}
      >
        <SheetContent className="h-dvh w-full overflow-y-auto p-0 md:h-[calc(100dvh-2rem)] md:rounded-2xl lg:h-full lg:rounded-none">
          <BackHeader title="Λεπτομέρειες Ραντεβού" />

          <BookingDetails
            appointment={selectedAppointment}
            onClose={() => setSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
