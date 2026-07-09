import Header from "@/components/header/header";
import { LatestBookingsSection } from "@/components/latest-bookings/latest-bookings-section";

export default function Home() {
  return (
    <>
      <Header
        heroBgUrl="/images/after-glow-header.png"
        heroTitle="After Glow Ραντεβού"
        avatarImgUrl="/images/after-glow-logo.jpg"
        avatarAlt="After Glow Logo"
        calendarColor="text-pink-600"
        infoTextboxBgColor="bg-pink-50"
        textInfoOne="128 ενεργά ραντεβού"
        textInfoTwo="Σήμερα: 12 ραντεβού"
      />
      <div className="mx-5 sm:mx-10">
        <LatestBookingsSection />
      </div>
    </>
  );
}
