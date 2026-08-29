"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Service } from "@/features/services/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateService } from "@/features/services/mutations";

interface ServiceEditFormProps {
  service: Service;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ServiceFormValues {
  name: string;
  price: string;
  durationMinutes: string;
}

export default function ServiceEditForm({
  service,
  onSuccess,
  onCancel,
}: ServiceEditFormProps) {
  const updateService = useUpdateService();

  const form = useForm<ServiceFormValues>({
    defaultValues: {
      name: service.name,
      price: String(service.price),
      durationMinutes: String(service.durationMinutes),
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

    updateService.mutate(
      {
        id: service.id,
        input: {
          name: values.name.trim(),
          price: String(price),
          durationMinutes,
        },
      },
      {
        onSuccess: () => {
          toast.success("Η υπηρεσία ενημερώθηκε", {
            description: "Οι αλλαγές αποθηκεύτηκαν επιτυχώς.",
          });

          onSuccess();
        },

        onError: (error) => {
          toast.error("Αποτυχία ενημέρωσης", {
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
      <div className="space-y-2">
        <Label htmlFor="service-name">Όνομα υπηρεσίας</Label>

        <Input
          id="service-name"
          {...form.register("name")}
          className="h-12 rounded-xl"
        />

        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-price">Τιμή</Label>

        <Input
          id="service-price"
          type="number"
          min="0"
          step="0.01"
          {...form.register("price")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-duration">Διάρκεια (λεπτά)</Label>

        <Input
          id="service-duration"
          type="number"
          min="1"
          step="1"
          {...form.register("durationMinutes")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl sm:w-auto"
          onClick={onCancel}
          disabled={updateService.isPending}
        >
          Ακύρωση
        </Button>

        <Button
          type="submit"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          disabled={updateService.isPending}
        >
          {updateService.isPending ? "Αποθήκευση..." : "Αποθήκευση αλλαγών"}
        </Button>
      </div>
    </form>
  );
}
