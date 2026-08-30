import { Card } from "@/components/ui/card";
import { Appointment } from "@/features/appointments/types";
import { Calendar, User, Briefcase, Globe, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { appointmentStatusMap } from "@/features/appointments/utils";

interface LatestBookingCardProps {
  appointment: Appointment;
  status?: Appointment["status"];
}

export function LatestBookingCard({
  appointment,
  status = appointment.status,
}: LatestBookingCardProps) {
  const statusInfo = appointmentStatusMap[status];
  return (
    <Card className="w-full overflow-hidden transition-shadow duration-200 hover:shadow-lg p-0 mb-4">
      <div className="flex">
        {/* Left color accent */}
        <div
          className="w-2 shrink-0 self-stretch bg-pink-400"
          aria-hidden="true"
        />

        {/* Content: 2 cols on mobile, 4 cols on larger screens */}
        <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" aria-hidden="true" />
              <span className="text-sm">Ημερομηνία</span>
            </div>

            <p className="font-heading text-base font-semibold text-card-foreground">
              {new Intl.DateTimeFormat("el-GR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Europe/Athens",
              }).format(new Date(appointment?.startDateTime))}
            </p>
          </div>

          {/* Customer */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="size-4" aria-hidden="true" />
              <span className="text-sm">Πελάτης</span>
            </div>

            <p className="font-heading text-base font-semibold text-card-foreground">
              {appointment?.customer?.fullName ?? "-"}
            </p>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="size-4" aria-hidden="true" />
              <span className="text-sm">
                {appointment?.services?.length > 1 ? "Υπηρεσίες" : "Υπηρεσία"}
              </span>
            </div>

            {appointment.services.length > 0 && (
              <div className="min-w-0">
                <p className="truncate font-heading text-base font-semibold text-card-foreground">
                  {appointment.services[0].service.name}
                </p>

                {appointment.services.length > 1 && (
                  <p className="mt-1 text-sm font-medium text-pink-600">
                    +{appointment.services.length - 1} ακόμη
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Source */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="size-4" aria-hidden="true" />
              <span className="text-sm">Πηγή</span>
            </div>

            <p className="font-heading text-base font-semibold text-card-foreground">
              {appointment?.source?.name}
            </p>
          </div>

          <Badge
            variant="outline"
            className={`shrink-0 ${statusInfo.className}`}
          >
            {statusInfo.label}
          </Badge>
        </div>

        {/* Right-center arrow */}
        <div className="flex shrink-0 items-center pr-4 pl-2 text-muted-foreground">
          <ChevronRight className="size-5" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
