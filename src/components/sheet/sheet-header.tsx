import { CalendarDays } from "lucide-react";
import { SheetHeader, SheetTitle } from "../ui/sheet";

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({ title }: BackHeaderProps) {
  return (
    <SheetHeader className="border-b bg-linear-to-r from-pink-50 via-white to-pink-50 px-6 pb-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-200">
          <CalendarDays className="h-7 w-7 text-pink-600" />
        </div>

        <div className="flex-1">
          <SheetTitle className="text-2xl font-bold tracking-tight">
            {title}
          </SheetTitle>
        </div>
      </div>
    </SheetHeader>
  );
}
