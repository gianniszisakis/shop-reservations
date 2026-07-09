import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function NewBookingButton() {
  return (
    <div className="flex items-center justify-center p-6">
      <Button
        size="lg"
        className="gap-2 transition-shadow duration-200 hover:shadow-lg bg-pink-600 hover:bg-pink-500"
      >
        <Plus className="size-4" aria-hidden="true" />
        Καταχώρηση Νέου Ραντεβού
      </Button>
    </div>
  );
}
