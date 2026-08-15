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

import { useCancelAppointment } from "@/features/appointments/mutations";

interface CancelAppointmentDialogProps {
  appointmentId: string;
  customerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CancelAppointmentDialog({
  appointmentId,
  customerName,
  open,
  onOpenChange,
  onSuccess,
}: CancelAppointmentDialogProps) {
  const cancelAppointment = useCancelAppointment();

  function handleCancel() {
    cancelAppointment.mutate(appointmentId, {
      onSuccess: () => {
        toast.success("Το ραντεβού ακυρώθηκε", {
          description: `Το ραντεβού του/της ${customerName} ακυρώθηκε.`,
        });

        onOpenChange(false);
        onSuccess();
      },

      onError: (error) => {
        toast.error("Αποτυχία ακύρωσης", {
          description:
            error instanceof Error
              ? error.message
              : "Παρουσιάστηκε κάποιο πρόβλημα.",
        });
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Ακύρωση ραντεβού</AlertDialogTitle>

          <AlertDialogDescription>
            Είσαι σίγουρος ότι θέλεις να ακυρώσεις το ραντεβού του/της{" "}
            <span className="font-semibold text-foreground">
              {customerName}
            </span>
            ;
            <br />Η ενέργεια αυτή θα αλλάξει την κατάσταση του ραντεβού σε
            «Ακυρωμένο».
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel
            disabled={cancelAppointment.isPending}
            className="w-full sm:w-auto"
          >
            Όχι, πίσω
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={cancelAppointment.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleCancel();
            }}
            className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
          >
            {cancelAppointment.isPending ? "Ακύρωση..." : "Ναι, ακύρωση"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
