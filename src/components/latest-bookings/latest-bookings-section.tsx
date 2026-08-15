"use client";
import { useState } from "react";
import { LatestBookingCard } from "./latest-booking-card";
import { Eye, EyeOff } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import BackHeader from "../sheet/sheet-header";
import BookingDetails from "../booking/booking-details";
import { useAppointments } from "@/features/appointments/queries";
import { Appointment } from "@/features/appointments/types";
import { LatestBookingCardSkeleton } from "./latest-booking-card-skeleton";
import ErrorState from "../shared/error-state";

export function LatestBookingsSection() {
  const [showSection, setShowSection] = useState(true);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const { data: appointments, isLoading, isError } = useAppointments();

  const upcomingAppointments =
    appointments?.filter(
      (appointment) => new Date(appointment.startDateTime) >= new Date(),
    ) ?? [];

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
        {isLoading ? (
          <LatestBookingCardSkeleton />
        ) : isError ? (
          <ErrorState message="Αδυναμία φόρτωσης ραντεβού" />
        ) : upcomingAppointments && upcomingAppointments?.length > 0 ? (
          appointments?.map((appointment: Appointment) => (
            <button
              key={appointment?.id}
              type="button"
              className="appearance-none border-none bg-transparent text-left w-full"
              onClick={() => {
                setSelectedAppointment(appointment);
                setSheetOpen(true);
              }}
            >
              <LatestBookingCard appointment={appointment} />
            </button>
          ))
        ) : null}
      </div>

      {/* Right sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="h-dvh w-full overflow-y-auto p-0 md:h-[calc(100dvh-2rem)] md:rounded-2xl lg:h-full lg:rounded-none">
          <BackHeader title="Λεπτομέρειες Ραντεβού" />

          <BookingDetails appointment={selectedAppointment} />
        </SheetContent>
      </Sheet>
    </>
  );
}
