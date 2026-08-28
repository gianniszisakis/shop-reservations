"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateCustomer } from "@/features/customers/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewCustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface NewCustomerFormValues {
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export default function NewCustomerForm({
  onSuccess,
  onCancel,
}: NewCustomerFormProps) {
  const createCustomer = useCreateCustomer();

  const form = useForm<NewCustomerFormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  function onSubmit(values: NewCustomerFormValues) {
    createCustomer.mutate(
      {
        fullName: values.fullName.trim(),
        phone: values.phone.trim() || null,
        email: values.email.trim() || null,
        notes: values.notes.trim() || null,
      },
      {
        onSuccess: (customer) => {
          toast.success("Ο πελάτης προστέθηκε", {
            description: `${customer.fullName} δημιουργήθηκε επιτυχώς.`,
          });

          form.reset();
          onSuccess();
        },

        onError: (error) => {
          toast.error("Αποτυχία δημιουργίας πελάτη", {
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
        <Label htmlFor="new-customer-full-name">Ονοματεπώνυμο</Label>

        <Input
          id="new-customer-full-name"
          {...form.register("fullName", {
            required: "Το ονοματεπώνυμο είναι υποχρεωτικό.",
          })}
          className="h-12 rounded-xl"
        />

        {form.formState.errors.fullName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-customer-phone">Τηλέφωνο</Label>

        <Input
          id="new-customer-phone"
          type="tel"
          {...form.register("phone")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-customer-email">Email</Label>

        <Input
          id="new-customer-email"
          type="email"
          {...form.register("email")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-customer-notes">Σημειώσεις</Label>

        <Textarea
          id="new-customer-notes"
          {...form.register("notes")}
          className="min-h-28 resize-none rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl sm:w-auto"
          onClick={onCancel}
          disabled={createCustomer.isPending}
        >
          Ακύρωση
        </Button>

        <Button
          type="submit"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          disabled={createCustomer.isPending}
        >
          {createCustomer.isPending ? "Αποθήκευση..." : "Αποθήκευση πελάτη"}
        </Button>
      </div>
    </form>
  );
}
