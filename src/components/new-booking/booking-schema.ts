import { z } from "zod";

export const bookingSchema = z
  .object({
    customerId: z
      .string()
      .min(1, "Παρακαλούμε επιλέξτε πελάτη για να συνεχίσετε."),

    serviceIds: z.array(z.string()).min(1, "Επέλεξε τουλάχιστον μία υπηρεσία."),

    sourceId: z.string().min(1, "Επέλεξε πηγή κράτησης."),

    bookingDate: z
      .date({
        error: "Επέλεξε ημερομηνία.",
      })
      .optional(),

    bookingTime: z.string().min(1, "Επίλεξε ώρα."),

    notes: z.string().optional(),
  })
  .refine((data) => data.bookingDate !== undefined, {
    path: ["bookingDate"],
    message: "Επέλεξε ημερομηνία.",
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
