"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NewCustomerFieldsProps {
  onCancel: () => void;
  onSave?: () => void;
}

export default function NewCustomerFields({
  onCancel,
  onSave,
}: NewCustomerFieldsProps) {
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
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="customer-notes">Σημειώσεις</Label>

          <Textarea
            id="customer-notes"
            name="notes"
            className="min-h-28 resize-none rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl sm:w-auto"
          onClick={onCancel}
        >
          Ακύρωση
        </Button>

        <Button
          type="button"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          onClick={onSave}
        >
          Αποθήκευση Πελάτη
        </Button>
      </div>
    </section>
  );
}
