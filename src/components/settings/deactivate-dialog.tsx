"use client";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeactivateDialogProps {
  entityName: string;
  entityLabel?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeactivate: () => Promise<void> | void;
}

export default function DeactivateDialog({
  entityName,
  entityLabel = "αυτό το στοιχείο",
  open,
  onOpenChange,
  onDeactivate,
}: DeactivateDialogProps) {
  async function handleDeactivate() {
    try {
      await onDeactivate();

      toast.success("Απενεργοποιήθηκε", {
        description: `${entityLabel} "${entityName}" απενεργοποιήθηκε επιτυχώς.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Αποτυχία απενεργοποίησης", {
        description:
          error instanceof Error
            ? error.message
            : "Παρουσιάστηκε κάποιο πρόβλημα.",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Απενεργοποίηση {entityLabel};</AlertDialogTitle>

          <AlertDialogDescription>
            Είσαι σίγουρος ότι θέλεις να απενεργοποιήσεις{" "}
            <span className="font-semibold text-foreground">{entityName}</span>
            ;
            <br />
            Το στοιχείο θα παραμείνει στη βάση δεδομένων αλλά δεν θα εμφανίζεται
            ως ενεργό.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel className="w-full sm:w-auto">
            Όχι, πίσω
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void handleDeactivate();
            }}
            className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
          >
            Ναι, απενεργοποίηση
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
