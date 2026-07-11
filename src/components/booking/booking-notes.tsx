import { StickyNote } from "lucide-react";

interface BookingNotesProps {
  notes: string;
}

export default function BookingNotes({ notes }: BookingNotesProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <StickyNote className="h-5 w-5 text-pink-600" />

        <h3 className="text-lg font-semibold">Σημειώσεις</h3>
      </div>

      <div className="rounded-xl bg-muted p-5 leading-7 text-muted-foreground">
        {notes}
      </div>
    </section>
  );
}
