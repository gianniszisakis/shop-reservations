"use client";

import { User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerDisplayProps {
  customerName: string;
}

export default function CustomerDisplay({
  customerName,
}: CustomerDisplayProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="customer-display">Πελάτης</Label>

      <div className="relative">
        <User className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="customer-display"
          value={customerName}
          readOnly
          className="h-12 rounded-xl bg-muted/50 pl-11"
        />
      </div>
    </div>
  );
}
