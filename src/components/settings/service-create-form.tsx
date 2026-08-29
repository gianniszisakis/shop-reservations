"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateService } from "@/features/services/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceCreateFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface ServiceFormValues {
  name: string;
  price: string;
  durationMinutes: string;
}

export default function ServiceCreateForm({
  onSuccess,
  onCancel,
}: ServiceCreateFormProps) {
  const createService = useCreateService();

  const form = useForm<ServiceFormValues>({
    defaultValues: {
      name: "",
      price: "",
      durationMinutes: "",
    },
  });

  function onSubmit(values: ServiceFormValues) {
    const price = Number(values.price);
    const durationMinutes = Number(values.durationMinutes);

    if (!values.name.trim()) {
      toast.error("Το όνομα της υπηρεσίας είναι υποχρεωτικό.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Επίλεξε έγκυρη τιμή.");
      return;
    }

    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      toast.error("Επίλεξε έγκυρη διάρκεια.");
      return;
    }

    createService.mutate(
      {
        name: values.name.trim(),
        price: String(price),
        durationMinutes,
      },
      {
        onSuccess: () => {
          toast.success("Η υπηρεσία δημιουργήθηκε", {
            description: "Η νέα υπηρεσία προστέθηκε επιτυχώς.",
          });

          form.reset();
          onSuccess();
        },

        onError: (error) => {
          toast.error("Αποτυχία δημιουργίας υπηρεσίας", {
            description:
              error instanceof Error
                ? error.message
                : "Παρουσιάστηκε κάποιο πρόβλημα.",
          });
        },
      },
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 p-5 sm:p-6"
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="new-service-name">Όνομα υπηρεσίας</Label>

        <Input
          id="new-service-name"
          placeholder="π.χ. Μανικιούρ Ημιμόνιμο"
          {...form.register("name")}
          className="h-12 rounded-xl"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="new-service-price">Τιμή (€)</Label>

        <Input
          id="new-service-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="π.χ. 25"
          {...form.register("price")}
          className="h-12 rounded-xl"
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="new-service-duration">Διάρκεια (λεπτά)</Label>

        <Input
          id="new-service-duration"
          type="number"
          min="1"
          step="1"
          placeholder="π.χ. 60"
          {...form.register("durationMinutes")}
          className="h-12 rounded-xl"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl sm:w-auto"
          disabled={createService.isPending}
          onClick={onCancel}
        >
          Ακύρωση
        </Button>

        <Button
          type="submit"
          disabled={createService.isPending}
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
        >
          {createService.isPending ? "Αποθήκευση..." : "Αποθήκευση υπηρεσίας"}
        </Button>
      </div>
    </form>
  );
}
