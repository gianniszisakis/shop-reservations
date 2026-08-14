"use client";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import BackHeader from "../sheet/sheet-header";
import BookingForm from "./booking-form";

export function NewBookingButton() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="gap-2 rounded-xl px-6 bg-pink-600 hover:bg-pink-500 transition-shadow duration-200 hover:shadow-lg"
        onClick={() => setSheetOpen(true)}
      >
        <CalendarPlus className="h-5 w-5" />
        Νέο Ραντεβού
      </Button>
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="h-dvh w-full overflow-y-auto p-0 md:h-[calc(100dvh-2rem)] md:rounded-2xl lg:h-full lg:rounded-none">
          <BackHeader title="Νέο Ραντεβού" />
          <BookingForm onSuccess={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
