"use client";

import type { Source } from "@/features/sources/types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SourceEditForm from "./source-edit-form";

interface SourceEditSheetProps {
  source: Source | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SourceEditSheet({
  source,
  open,
  onOpenChange,
}: SourceEditSheetProps) {
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
          <SheetTitle className="text-xl font-bold">
            Επεξεργασία Πηγής
          </SheetTitle>

          <SheetDescription>Ενημέρωσε τα στοιχεία της πηγής.</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {source && (
            <SourceEditForm
              source={source}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
