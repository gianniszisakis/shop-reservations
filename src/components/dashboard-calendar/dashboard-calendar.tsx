"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMemo, useState } from "react";

import { useAppointments } from "@/features/appointments/queries";
import type { Appointment } from "@/features/appointments/types";

import CalendarAppointmentCard from "./calendar-appointment-card";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import BackHeader from "../sheet/sheet-header";
import BookingDetails from "../booking/booking-details";
import ErrorState from "../shared/error-state";
import CalendarAppointmentCardSkeleton from "./calendar-appointment-card-skeleton";

const DAY_NAMES = ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"];

function getStartOfWeek(date: Date) {
  const result = new Date(date);

  // Monday = beginning of week
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

function getWeek(date: Date) {
  const start = getStartOfWeek(date);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);

    return day;
  });
}

export default function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [isSheetOpen, setSheetOpen] = useState(false);
  const { data: appointments, isLoading, isError } = useAppointments();

  const week = getWeek(currentWeek);

  function previousWeek() {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() - 7);
    setCurrentWeek(date);
  }

  function nextWeek() {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() + 7);
    setCurrentWeek(date);
  }

  const selectedDateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(selectedDate);

  const selectedDayAppointments = useMemo(() => {
    if (!appointments) {
      return [];
    }

    return appointments
      .filter((appointment) => {
        const appointmentDate = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Europe/Athens",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(appointment.startDateTime));

        return appointmentDate === selectedDateKey;
      })
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      );
  }, [appointments, selectedDateKey]);

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold tracking-tight pb-4">
        Ημερολόγιο Ραντεβού
      </h1>
      <Card className="w-full rounded-3xl p-4 sm:p-6">
        {/* Navigation */}
        <div className="mb-5 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={previousWeek}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <p className="text-sm font-semibold">
            {new Intl.DateTimeFormat("el-GR", {
              day: "numeric",
              month: "long",
            }).format(week[0])}
            {" – "}
            {new Intl.DateTimeFormat("el-GR", {
              day: "numeric",
              month: "long",
            }).format(week[6])}
          </p>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={nextWeek}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Week */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {week.map((date) => {
            const selected =
              date.toDateString() === selectedDate.toDateString();

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`flex min-w-0 flex-col items-center rounded-2xl px-1 py-3 transition sm:px-3 ${
                  selected
                    ? "bg-pink-600 text-white shadow-sm"
                    : "hover:bg-pink-50"
                }`}
              >
                <span
                  className={`text-[10px] sm:text-xs ${
                    selected ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {DAY_NAMES[date.getDay()]}
                </span>

                <span className="mt-1 text-base font-semibold sm:text-lg">
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected date */}
        <div className="mt-6 border-t pt-5">
          <h3 className="font-semibold">Ραντεβού</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {new Intl.DateTimeFormat("el-GR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }).format(selectedDate)}
          </p>

          <div className="mt-5 space-y-3">
            {isLoading && <CalendarAppointmentCardSkeleton />}

            {isError && <ErrorState />}

            {!isLoading && !isError && selectedDayAppointments.length === 0 && (
              <div className="rounded-2xl border border-dashed p-8 text-center">
                <p className="text-sm font-medium">Δεν υπάρχουν ραντεβού</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Δεν υπάρχουν προγραμματισμένα ραντεβού για αυτή την ημέρα.
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              selectedDayAppointments.map((appointment) => (
                <CalendarAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setSheetOpen(true);
                  }}
                />
              ))}
          </div>

          {/* Right sheet */}
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
        </div>
      </Card>
    </div>
  );
}
