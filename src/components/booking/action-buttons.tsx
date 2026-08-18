import { Pencil, Ban } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import CancelAppointmentDialog from "./cancel-appointment-dialog";
import { Appointment } from "@/features/appointments/types";

interface ActionButtonsProps {
  appointment: Appointment | null;
  onEdit: () => void;
  onCancelSuccess: () => void;
}

export default function ActionButtons({
  appointment,
  onEdit,
  onCancelSuccess,
}: ActionButtonsProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  if (!appointment) {
    return null;
  }
  return (
    <>
      <div className="flex gap-4">
        <Button className="flex-1" size="lg" onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Επεξεργασία
        </Button>

        <Button
          variant="destructive"
          className="flex-1"
          size="lg"
          onClick={() => setIsCancelDialogOpen(true)}
        >
          <Ban className="mr-2 h-4 w-4" />
          Ακύρωση
        </Button>
      </div>
      <CancelAppointmentDialog
        appointmentId={appointment?.id}
        customerName={appointment?.customer?.fullName}
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onSuccess={onCancelSuccess}
      />
    </>
  );
}
