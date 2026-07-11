import { Separator } from "@/components/ui/separator";
import ActionButtons from "./action-buttons";

import BookingNotes from "./booking-notes";
import AppointmentDetailsSection from "./appointment-details-section";
import CustomerDetailsSection from "./customer-details-section";

export default function BookingDetails() {
  return (
    <div className="space-y-4 p-8">
      {/* Customer Info */}
      <CustomerDetailsSection />

      {/* Appointment */}
      <AppointmentDetailsSection />

      {/* Notes */}
      <BookingNotes notes="H πελάτισσα θέλει ξύλο" />

      <Separator />

      <ActionButtons />
    </div>
  );
}
