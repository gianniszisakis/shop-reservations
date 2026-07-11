import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Button className="flex-1" size="lg">
        <Pencil className="mr-2 h-4 w-4" />
        Επεξεργασία
      </Button>

      <Button variant="destructive" className="flex-1" size="lg">
        <Trash2 className="mr-2 h-4 w-4" />
        Διαγραφή
      </Button>
    </div>
  );
}
