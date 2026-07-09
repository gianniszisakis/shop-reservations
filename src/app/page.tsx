import { LatestBookingsSection } from "@/components/latest-bookings/latest-bookings-section";
import { NewBookingButton } from "@/components/new-booking/new-booking-section";

export default function Home() {
  return (
    <div className="mx-5 sm:mx-10">
      <NewBookingButton />
      <LatestBookingsSection />
    </div>
  );
}
