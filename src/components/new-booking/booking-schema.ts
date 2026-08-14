import { z } from "zod";

export const bookingSchema = z
  .object({
    customerId: z.string().min(1, "Επίλεξε πελάτη."),

    serviceIds: z.array(z.string()).min(1, "Επίλεξε τουλάχιστον μία υπηρεσία."),

    sourceId: z.string().min(1, "Επίλεξε πηγή κράτησης."),

    bookingDate: z
      .date({
        error: "Επίλεξε ημερομηνία.",
      })
      .optional(),

    bookingTime: z.string().min(1, "Επίλεξε ώρα."),

    notes: z.string().optional(),
  })
  .refine((data) => data.bookingDate !== undefined, {
    path: ["bookingDate"],
    message: "Επίλεξε ημερομηνία.",
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
