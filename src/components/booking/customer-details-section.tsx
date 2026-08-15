import { Phone, User, MailIcon } from "lucide-react";
import InfoCard from "./info-card";
import { Appointment } from "@/features/appointments/types";

interface CustomerDetailsSectionProps {
  appointment: Appointment | null;
}

export default function CustomerDetailsSection({
  appointment,
}: CustomerDetailsSectionProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Πελάτης</h3>

      <div
        className={`grid gap-4 ${appointment?.customer?.email ? "md:grid-cols-3" : "md:grid-cols-2"}`}
      >
        <InfoCard
          icon={<User className="h-5 w-5" />}
          title="Όνομα"
          value={appointment?.customer?.fullName ?? "-"}
        />

        <InfoCard
          icon={<Phone className="h-5 w-5" />}
          title="Τηλέφωνο"
          value={appointment?.customer?.phone ?? "-"}
        />

        {appointment?.customer?.email && (
          <InfoCard
            icon={<MailIcon className="h-5 w-5" />}
            title="Email"
            value={appointment?.customer?.email ?? "-"}
          />
        )}
      </div>
    </section>
  );
}
