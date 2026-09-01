"use client";

import { Button } from "@/components/ui/button";
import { HistoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function HistoricDataButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="lg"
      className="gap-2 rounded-xl bg-pink-600 px-6 transition-shadow duration-200 hover:bg-pink-500 hover:shadow-lg"
      onClick={() => router.push("/appointments")}
    >
      <HistoryIcon className="h-5 w-5" />
      Ιστορικό
    </Button>
  );
}
