import { Phone, User } from "lucide-react";
import InfoCard from "./info-card";

export default function CustomerDetailsSection() {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Πελάτης</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={<User className="h-5 w-5" />}
          title="Όνομα"
          value="Μαρία Παπαδοπούλου"
        />

        <InfoCard
          icon={<Phone className="h-5 w-5" />}
          title="Τηλέφωνο"
          value="+357 99123456"
        />
      </div>
    </section>
  );
}
