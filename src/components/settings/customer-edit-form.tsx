"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Customer } from "@/features/customers/types";
import { useUpdateCustomer } from "@/features/customers/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomerEditFormProps {
  customer: Customer;
  onSuccess: () => void;
  onCancel: () => void;
}

interface CustomerFormValues {
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export default function CustomerEditForm({
  customer,
  onSuccess,
  onCancel,
}: CustomerEditFormProps) {
  const updateCustomer = useUpdateCustomer();

  const form = useForm<CustomerFormValues>({
    defaultValues: {
      fullName: customer.fullName,
      phone: customer.phone ?? "",
      email: customer.email ?? "",
      notes: customer.notes ?? "",
    },
  });

  function onSubmit(values: CustomerFormValues) {
    updateCustomer.mutate(
      {
        id: customer.id,
        input: {
          fullName: values.fullName.trim(),
          phone: values.phone.trim() || null,
          email: values.email.trim() || null,
          notes: values.notes.trim() || null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Ο πελάτης ενημερώθηκε", {
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
        <Label htmlFor="edit-customer-full-name">Ονοματεπώνυμο</Label>

        <Input
          id="edit-customer-full-name"
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
        <Label htmlFor="edit-customer-phone">Τηλέφωνο</Label>

        <Input
          id="edit-customer-phone"
          type="tel"
          {...form.register("phone")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-customer-email">Email</Label>

        <Input
          id="edit-customer-email"
          type="email"
          {...form.register("email")}
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-customer-notes">Σημειώσεις</Label>

        <Textarea
          id="edit-customer-notes"
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
          disabled={updateCustomer.isPending}
        >
          Ακύρωση
        </Button>

        <Button
          type="submit"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          disabled={updateCustomer.isPending}
        >
          {updateCustomer.isPending ? "Αποθήκευση..." : "Αποθήκευση αλλαγών"}
        </Button>
      </div>
    </form>
  );
}
