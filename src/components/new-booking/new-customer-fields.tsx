"use client";

import { useState } from "react";

import { useCreateCustomer } from "@/features/customers/mutations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface NewCustomerFieldsProps {
  onCancel: () => void;
  onCreated: (customerId: string) => void;
}

export default function NewCustomerFields({
  onCancel,
  onCreated,
}: NewCustomerFieldsProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const createCustomer = useCreateCustomer();

  function handleSave() {
    const trimmedFullName = fullName.trim();

    if (!trimmedFullName) {
      return;
    }

    createCustomer.mutate(
      {
        fullName: trimmedFullName,
        phone: phone.trim() || null,
        email: email.trim() || null,
        notes: notes.trim() || null,
      },
      {
        onSuccess: (customer) => {
          toast.success("Ο πελάτης προστέθηκε", {
            description: `${customer.fullName} δημιουργήθηκε επιτυχώς.`,
          });

          onCreated(customer.id);
        },

        onError: (error) => {
          toast.error("Αποτυχία δημιουργίας πελάτη", {
            description:
              error instanceof Error
                ? error.message
                : "Παρουσιάστηκε κάποιο πρόβλημα. Προσπαθήστε ξανά.",
          });
        },
      },
    );
  }

  return (
    <section className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Νέος Πελάτης</h3>
      </div>

      <div className="space-y-4">
        {/* Full name */}
        <div className="space-y-2">
          <Label htmlFor="customer-full-name">
            Ονοματεπώνυμο <span className="text-destructive">*</span>
          </Label>

          <Input
            id="customer-full-name"
            name="fullName"
            type="text"
            placeholder="π.χ. Μαρία Παπαδοπούλου"
            className="h-12 rounded-xl"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            disabled={createCustomer.isPending}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="customer-phone">Τηλέφωνο</Label>

          <Input
            id="customer-phone"
            name="phone"
            type="tel"
            placeholder="π.χ. 99123456"
            className="h-12 rounded-xl"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={createCustomer.isPending}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="customer-email">Email</Label>

          <Input
            id="customer-email"
            name="email"
            type="email"
            placeholder="π.χ. maria@email.com"
            className="h-12 rounded-xl"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={createCustomer.isPending}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="customer-notes">Σημειώσεις</Label>

          <Textarea
            id="customer-notes"
            name="notes"
            placeholder="Προτιμήσεις ή άλλες σημειώσεις..."
            className="min-h-28 resize-none rounded-xl"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={createCustomer.isPending}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:justify-end">
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
          type="button"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          onClick={handleSave}
          disabled={!fullName.trim() || createCustomer.isPending}
        >
          {createCustomer.isPending ? "Αποθήκευση..." : "Αποθήκευση Πελάτη"}
        </Button>
      </div>
    </section>
  );
}
