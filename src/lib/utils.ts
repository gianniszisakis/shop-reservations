import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAppointmentDateTime(startDateTime: string) {
  const date = new Date(startDateTime);

  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const year = Number(dateParts.find((part) => part.type === "year")?.value);

  const month = Number(dateParts.find((part) => part.type === "month")?.value);

  const day = Number(dateParts.find((part) => part.type === "day")?.value);

  const hour = timeParts.find((part) => part.type === "hour")?.value ?? "00";

  const minute =
    timeParts.find((part) => part.type === "minute")?.value ?? "00";

  return {
    date: new Date(year, month - 1, day),
    time: `${hour}:${minute}`,
  };
}
