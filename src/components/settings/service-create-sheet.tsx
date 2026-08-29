"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import ServiceCreateForm from "./service-create-form";

interface ServiceCreateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ServiceCreateSheet({
  open,
  onOpenChange,
}: ServiceCreateSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
          flex
          h-dvh
          w-full
          flex-col
          gap-0
          overflow-hidden
          p-0
          sm:max-w-xl
        "
      >
        <SheetHeader className="shrink-0 border-b bg-linear-to-r from-pink-50 via-white to-pink-50 px-6 py-5 text-left sm:px-8">
          <SheetTitle className="text-xl font-bold">Νέα Υπηρεσία</SheetTitle>

          <SheetDescription>Πρόσθεσε μια νέα υπηρεσία.</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ServiceCreateForm
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
