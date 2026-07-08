import { Card } from "@/components/ui/card";
import { Calendar, User, Briefcase, Globe } from "lucide-react";

const details = [
  {
    icon: Calendar,
    label: "Ημερομηνία",
    value: "Jul 9, 2026 · 2:30 PM",
  },
  {
    icon: User,
    label: "Πελάτης",
    value: "Νάνσυ Χούρι",
  },
  {
    icon: Briefcase,
    label: "Υπηρεσία",
    value: "Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (απλό χρώμα η χωρίς)",
  },
  {
    icon: Globe,
    label: "Πηγή",
    value: "Treatwell",
  },
];

export function LatestBookingCard() {
  return (
    <Card className="w-full max-w-3xl overflow-hidden p-0">
      <div className="flex">
        {/* Left color accent */}
        <div
          className="w-2 shrink-0 self-stretch bg-pink-400"
          aria-hidden="true"
        />

        {/* Content: 2 cols on mobile, 4 cols on larger screens */}
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-6 p-6 sm:grid-cols-4">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div key={detail.label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="text-sm">{detail.label}</span>
                </div>
                <p className="font-heading text-base font-semibold text-card-foreground">
                  {detail.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
