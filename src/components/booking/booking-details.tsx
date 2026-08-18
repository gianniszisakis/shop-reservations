import { Separator } from "@/components/ui/separator";
import ActionButtons from "./action-buttons";

import BookingNotes from "./booking-notes";
import AppointmentDetailsSection from "./appointment-details-section";
import CustomerDetailsSection from "./customer-details-section";
import { Appointment } from "@/features/appointments/types";
import { useState } from "react";
import BookingForm from "../new-booking/booking-form";

interface LatestBookingDetailsProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export default function BookingDetails({
  appointment,
  onClose,
}: LatestBookingDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!appointment) {
    return null;
  }

  if (isEditing) {
    return (
      <BookingForm
        key={appointment?.id}
        appointment={appointment}
        onSuccess={() => {
          setIsEditing(false);
        }}
      />
    );
  }
  return (
    <div className="space-y-4 p-8">
      {/* Customer Info */}
      <CustomerDetailsSection appointment={appointment} />

      {/* Appointment */}
      <AppointmentDetailsSection appointment={appointment} />

      {/* Notes */}
      {appointment?.notes && <BookingNotes notes={appointment?.notes ?? "-"} />}

      <Separator />

      <ActionButtons
        appointment={appointment}
        onCancelSuccess={onClose}
        onEdit={() => setIsEditing(true)}
      />
    </div>
  );
}
