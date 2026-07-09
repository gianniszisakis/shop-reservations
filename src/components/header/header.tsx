import Image from "next/image";
import { CalendarDays } from "lucide-react";

import { NewBookingButton } from "../new-booking/new-booking-button";

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
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background bg-white shadow-xl">
              <Image
                src={avatarImgUrl}
                alt={avatarAlt}
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>

            <div className="pb-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                {heroTitle}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 ${infoTextboxBgColor}`}
                >
                  <CalendarDays className={`h-4 w-4 ${calendarColor}`} />
                  <span>{textInfoOne}</span>
                </div>

                <span className="hidden sm:block">•</span>

                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 ${infoTextboxBgColor}`}
                >
                  <CalendarDays className={`h-4 w-4 ${calendarColor}`} />
                  <span>{textInfoTwo}</span>
                </div>
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
