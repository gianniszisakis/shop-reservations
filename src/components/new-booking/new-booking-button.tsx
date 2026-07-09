import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export function NewBookingButton() {
  return (
    <Button
      size="lg"
      className="gap-2 rounded-xl px-6 bg-pink-600 hover:bg-pink-500 transition-shadow duration-200 hover:shadow-lg"
    >
      <CalendarPlus className="h-5 w-5" />
      Νέο Ραντεβού
    </Button>
  );
}
