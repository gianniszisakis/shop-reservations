"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import CustomerSearch from "./customer-search";

import NewCustomerFields from "./new-customer-fields";
import ServiceSelect from "./service-select";
import SourceSelect from "./source-select";
import BookingDateTime from "./booking-date-time";
import BookingNotes from "./booking-notes";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "./booking-schema";
import { toast } from "sonner";
import { useCreateAppointment } from "@/features/appointments/mutations";
import { Appointment } from "@/features/appointments/types";
import { getAppointmentDateTime } from "@/lib/utils";
import CustomerDisplay from "./customer-display";

interface BookingFormProps {
  appointment?: Appointment | null;
  onSuccess: () => void;
}

export default function BookingForm({
  onSuccess,
  appointment,
}: BookingFormProps) {
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

  const appointmentDateTime = appointment
    ? getAppointmentDateTime(appointment.startDateTime)
    : null;

  const createAppointment = useCreateAppointment();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      customerId: appointment?.customerId ?? "",

      serviceIds: appointment?.services.map(({ service }) => service.id) ?? [],

      sourceId: appointment?.sourceId ?? "",

      bookingDate: appointmentDateTime?.date ?? undefined,

      bookingTime: appointmentDateTime?.time ?? "",

      notes: appointment?.notes ?? "",
    },
  });

  const customerId = useWatch({
    control: form.control,
    name: "customerId",
  });

  const serviceIds = useWatch({
    control: form.control,
    name: "serviceIds",
  });

  const sourceId = useWatch({
    control: form.control,
    name: "sourceId",
  });

  const bookingDate = useWatch({
    control: form.control,
    name: "bookingDate",
  });

  const bookingTime = useWatch({
    control: form.control,
    name: "bookingTime",
  });

  const notes = useWatch({
    control: form.control,
    name: "notes",
  });

  function onSubmit(values: BookingFormValues) {
    if (!values.bookingDate) {
      toast.error("Επέλεξε ημερομηνία.");
      return;
    }

    const [hours, minutes] = values.bookingTime.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      toast.error("Επέλεξε έγκυρη ώρα.");
      return;
    }

    // Clone the selected date so we don't mutate the form value.
    const startDateTime = new Date(values.bookingDate);

    startDateTime.setHours(hours, minutes, 0, 0);

    createAppointment.mutate(
      {
        customerId: values.customerId,
        sourceId: values.sourceId,
        serviceIds: values.serviceIds,
        startDateTime: startDateTime.toISOString(),
        notes: values.notes?.trim() || null,
      },
      {
        onSuccess: () => {
          toast.success("Το ραντεβού δημιουργήθηκε", {
            description: "Το ραντεβού αποθηκεύτηκε επιτυχώς.",
          });

          form.reset();

          setIsCreatingCustomer(false);

          onSuccess();
        },

        onError: (error) => {
          toast.error("Αποτυχία δημιουργίας ραντεβού", {
            description:
              error instanceof Error
                ? error.message
                : "Παρουσιάστηκε κάποιο πρόβλημα.",
          });
        },
      },
    );
  }

  const onInvalid = () => {
    const errors = form.formState.errors;

    if (errors.customerId) {
      toast.error(errors.customerId.message);
      return;
    }

    if (errors.serviceIds) {
      toast.error(errors.serviceIds.message);
      return;
    }

    if (errors.sourceId) {
      toast.error(errors.sourceId.message);
      return;
    }

    if (errors.bookingDate) {
      toast.error(errors.bookingDate.message);
      return;
    }

    if (errors.bookingTime) {
      toast.error(errors.bookingTime.message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className="space-y-6 p-4 sm:p-6 lg:p-8"
    >
      {appointment ? (
        <CustomerDisplay customerName={appointment?.customer?.fullName} />
      ) : !isCreatingCustomer ? (
        <CustomerSearch
          value={customerId}
          onChange={(value) =>
            form.setValue("customerId", value, {
              shouldValidate: true,
            })
          }
          onAddNew={() => setIsCreatingCustomer(true)}
        />
      ) : (
        <NewCustomerFields
          onCancel={() => {
            setIsCreatingCustomer(false);
          }}
          onCreated={(newCustomerId) => {
            form.setValue("customerId", newCustomerId, {
              shouldValidate: true,
              shouldDirty: true,
            });

            setIsCreatingCustomer(false);
          }}
        />
      )}

      <ServiceSelect
        value={serviceIds}
        onChange={(value) =>
          form.setValue("serviceIds", value, {
            shouldValidate: true,
          })
        }
      />

      <SourceSelect
        value={sourceId}
        onChange={(value) =>
          form.setValue("sourceId", value, {
            shouldValidate: true,
          })
        }
      />

      <BookingDateTime
        date={bookingDate}
        time={bookingTime}
        onDateChange={(value) =>
          form.setValue("bookingDate", value, {
            shouldValidate: true,
          })
        }
        onTimeChange={(value) =>
          form.setValue("bookingTime", value, {
            shouldValidate: true,
          })
        }
      />

      <BookingNotes
        value={notes ?? ""}
        onChange={(value) => form.setValue("notes", value)}
      />

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-start">
        {/* <Button type="button" variant="outline" className="w-full sm:w-auto">
          Ακύρωση
        </Button> */}

        <Button
          type="submit"
          className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500"
        >
          Αποθήκευση
        </Button>
      </div>
    </form>
  );
}
