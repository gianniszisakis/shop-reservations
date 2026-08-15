import { Separator } from "@/components/ui/separator";
import ActionButtons from "./action-buttons";

import BookingNotes from "./booking-notes";
import AppointmentDetailsSection from "./appointment-details-section";
import CustomerDetailsSection from "./customer-details-section";
import { Appointment } from "@/features/appointments/types";

interface LatestBookingDetailsProps {
  appointment: Appointment | null;
}

export default function BookingDetails({
  appointment,
}: LatestBookingDetailsProps) {
  return (
    <div className="space-y-4 p-8">
      {/* Customer Info */}
      <CustomerDetailsSection appointment={appointment} />

      {/* Appointment */}
      <AppointmentDetailsSection appointment={appointment} />

      {/* Notes */}
      {appointment?.notes && <BookingNotes notes={appointment?.notes ?? "-"} />}

      <Separator />

      <ActionButtons />
    </div>
  );
}
