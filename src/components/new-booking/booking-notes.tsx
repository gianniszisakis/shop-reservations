"use client";

import { StickyNote } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookingNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BookingNotes({ value, onChange }: BookingNotesProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="booking-notes" className="flex items-center gap-2">
        <StickyNote className="h-4 w-4 text-pink-600" />
        Σημειώσεις
      </Label>

      <Textarea
        id="booking-notes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Προσθέστε προαιρετικές σημειώσεις για το ραντεβού..."
        className="min-h-28 resize-none rounded-xl"
      />

      <p className="text-xs text-muted-foreground">Προαιρετικό πεδίο</p>
    </div>
  );
}
