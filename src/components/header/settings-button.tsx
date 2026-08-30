"use client";

import { Button } from "@/components/ui/button";
import { Home, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function SettingsButton() {
  const router = useRouter();
  const pathname = usePathname();

  const isSettingsPage = pathname.startsWith("/settings");

  return (
    <Button
      type="button"
      size="lg"
      className="gap-2 rounded-xl bg-pink-600 px-6 transition-shadow duration-200 hover:bg-pink-500 hover:shadow-lg"
      onClick={() => router.push(isSettingsPage ? "/" : "/settings")}
    >
      {isSettingsPage ? (
        <>
          <Home className="h-5 w-5" />
          Αρχική
        </>
      ) : (
        <>
          <Settings className="h-5 w-5" />
          Ρυθμίσεις
        </>
      )}
    </Button>
  );
}
