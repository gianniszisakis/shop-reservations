"use client";

import { Button } from "@/components/ui/button";
import { HistoryIcon, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function HistoricDataButton() {
  const router = useRouter();
  const pathname = usePathname();

  const isSettingsPage = pathname.startsWith("/appointments");

  return (
    <Button
      type="button"
      size="lg"
      className="gap-2 rounded-xl bg-pink-600 px-6 transition-shadow duration-200 hover:bg-pink-500 hover:shadow-lg"
      onClick={() => router.push(isSettingsPage ? "/" : "/appointments")}
    >
      {isSettingsPage ? (
        <>
          <Home className="h-5 w-5" />
          Αρχική
        </>
      ) : (
        <>
          <HistoryIcon className="h-5 w-5" />
          Ιστορικό Ραντεβού
        </>
      )}
    </Button>
  );
}
