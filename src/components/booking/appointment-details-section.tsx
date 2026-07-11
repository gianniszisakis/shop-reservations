import { BookCheck, Briefcase, Calendar, Clock } from "lucide-react";
import InfoCard from "./info-card";

export default function AppointmentDetailsSection() {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Πληροφορίες Ραντεβού</h3>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard
          icon={<Calendar className="h-5 w-5" />}
          title="Ημερομηνία"
          value="09/07/2026"
        />

        <InfoCard
          icon={<Clock className="h-5 w-5" />}
          title="Ώρα"
          value="10:30"
        />

        <InfoCard
          icon={<BookCheck className="h-5 w-5" />}
          title="Σύστημα"
          value="Treatwell"
        />

        <div className="md:col-span-3">
          <InfoCard
            icon={<Briefcase className="h-5 w-5" />}
            title="Υπηρεσία"
            value="Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (απλό χρώμα η χωρίς)"
          />
        </div>
      </div>
    </section>
  );
}
