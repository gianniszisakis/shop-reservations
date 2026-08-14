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

export default function BookingForm() {
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      customerId: "",
      serviceIds: [],
      sourceId: "",
      bookingTime: "",
      notes: "",
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
    console.log(values);
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
      {!isCreatingCustomer ? (
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

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          Ακύρωση
        </Button>

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
