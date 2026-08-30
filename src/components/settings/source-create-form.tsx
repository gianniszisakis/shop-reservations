"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateSource } from "@/features/sources/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SourceCreateFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface SourceFormValues {
  name: string;
  displayOrder: string;
}

export default function SourceCreateForm({
  onSuccess,
  onCancel,
}: SourceCreateFormProps) {
  const createSource = useCreateSource();

  const form = useForm<SourceFormValues>({
    defaultValues: {
      name: "",
      displayOrder: "0",
    },
  });

  function onSubmit(values: SourceFormValues) {
    const displayOrder = Number(values.displayOrder);

    if (!values.name.trim()) {
      toast.error("Το όνομα της πηγής είναι υποχρεωτικό.");
      return;
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      toast.error("Επίλεξε έγκυρη σειρά εμφάνισης.");
      return;
    }

    createSource.mutate(
      {
        name: values.name.trim(),
        displayOrder,
      },
      {
        onSuccess: () => {
          toast.success("Η πηγή δημιουργήθηκε", {
            description: "Η πηγή προστέθηκε επιτυχώς.",
          });

          form.reset();
          onSuccess();
        },

        onError: (error) => {
          toast.error("Αποτυχία δημιουργίας πηγής", {
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
        <Label htmlFor="new-source-name">Όνομα πηγής</Label>

        <Input
          id="new-source-name"
          placeholder="π.χ. Instagram"
          {...form.register("name")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-source-display-order">Σειρά εμφάνισης</Label>

        <Input
          id="new-source-display-order"
          type="number"
          min="0"
          step="1"
          {...form.register("displayOrder")}
          className="h-12 rounded-xl"
        />

        <p className="text-xs text-muted-foreground">
          Μικρότερος αριθμός εμφανίζεται πρώτος.
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl sm:w-auto"
          disabled={createSource.isPending}
          onClick={onCancel}
        >
          Ακύρωση
        </Button>

        <Button
          type="submit"
          disabled={createSource.isPending}
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
        >
          {createSource.isPending ? "Αποθήκευση..." : "Αποθήκευση πηγής"}
        </Button>
      </div>
    </form>
  );
}
