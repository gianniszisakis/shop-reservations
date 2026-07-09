import { CalendarDays } from "lucide-react";

interface HeaderInfoBoxProps {
  bgColor: string;
  calendarColor: string;
  textInfo: string;
}

export default function HeaderInfoBox({
  bgColor,
  calendarColor,
  textInfo,
}: HeaderInfoBoxProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-2 ${bgColor}`}
    >
      <CalendarDays className={`h-4 w-4 ${calendarColor}`} />
      <span>{textInfo}</span>
    </div>
  );
}
