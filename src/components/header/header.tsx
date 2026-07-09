import { NewBookingButton } from "../new-booking/new-booking-button";
import HeaderAvatar from "./header-avatar";
import HeaderHeading from "./header-heading";
import HeaderInfoBox from "./header-info-box";

interface HeaderProps {
  heroBgUrl: string;
  heroTitle: string;
  avatarImgUrl: string;
  avatarAlt: string;
  calendarColor: string;
  infoTextboxBgColor: string;
  textInfoOne: string;
  textInfoTwo: string;
}

export default function Header({
  heroBgUrl,
  heroTitle,
  avatarImgUrl,
  avatarAlt,
  calendarColor,
  infoTextboxBgColor,
  textInfoOne,
  textInfoTwo,
}: HeaderProps) {
  return (
    <header className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Hero Banner */}
      <div
        className="relative h-44 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBgUrl})`,
        }}
      />

      {/* Content */}
      <div className="relative px-6 pb-6">
        <div className="-mt-20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <HeaderAvatar src={avatarImgUrl} alt={avatarAlt} />

            <div className="pb-2">
              <HeaderHeading title={heroTitle} />

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <HeaderInfoBox
                  bgColor={infoTextboxBgColor}
                  calendarColor={calendarColor}
                  textInfo={textInfoOne}
                />
                <HeaderInfoBox
                  bgColor={infoTextboxBgColor}
                  calendarColor={calendarColor}
                  textInfo={textInfoTwo}
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 pb-2">
            <NewBookingButton />
          </div>
        </div>
      </div>
    </header>
  );
}
