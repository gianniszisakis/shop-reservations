import { z } from "zod";

export const bookingSchema = z.object({
  customerId: z.string().min(1, "Επίλεξε πελάτη."),

  serviceIds: z.array(z.string()).min(1, "Επίλεξε τουλάχιστον μία υπηρεσία."),

  sourceId: z.string().min(1, "Επίλεξε πηγή κράτησης."),

  bookingDate: z.date({
    error: "Επίλεξε ημερομηνία.",
  }),

  bookingTime: z.string().min(1, "Επίλεξε ώρα."),

  notes: z.string().optional().or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
