import { BookCheck, Briefcase, Calendar, Clock, EuroIcon } from "lucide-react";
import InfoCard from "./info-card";
import { Appointment } from "@/features/appointments/types";

interface AppointmentDetailsSectionProps {
  appointment: Appointment | null;
}

export default function AppointmentDetailsSection({
  appointment,
}: AppointmentDetailsSectionProps) {
  //total price of services
  const totalPrice =
    appointment &&
    appointment.services.reduce(
      (total, { service }) => total + Number(service.price),
      0,
    );

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Πληροφορίες Ραντεβού</h3>

      <div className="grid gap-4 md:grid-cols-3">
        {appointment && (
          <>
            <InfoCard
              icon={<Calendar className="h-5 w-5" />}
              title="Ημερομηνία"
              value={new Intl.DateTimeFormat("el-GR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour12: false,
                timeZone: "Europe/Athens",
              }).format(new Date(appointment.startDateTime))}
            />

            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Ώρα έναρξης"
              value={new Intl.DateTimeFormat("el-GR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Athens",
              }).format(new Date(appointment.startDateTime))}
            />

            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Ώρα λήξης"
              value={new Intl.DateTimeFormat("el-GR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Athens",
              }).format(new Date(appointment.endDateTime))}
            />

            <InfoCard
              icon={<EuroIcon className="h-5 w-5" />}
              title="Συνολική τιμή"
              value={`${totalPrice?.toString()}€`}
            />

            <div className="md:col-span-2">
              <InfoCard
                icon={<BookCheck className="h-5 w-5" />}
                title="Πηγή"
                value={appointment?.source?.name ?? "-"}
              />
            </div>

            <div className="md:col-span-3">
              <InfoCard
                icon={<Briefcase className="h-5 w-5" />}
                title={
                  appointment.services.length > 1 ? "Υπηρεσίες" : "Υπηρεσία"
                }
                value={appointment.services
                  .map(({ service }) => `• ${service.name}`)
                  .join("\n")}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
