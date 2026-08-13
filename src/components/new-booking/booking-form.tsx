"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import CustomerSearch from "./customer-search";

import NewCustomerFields from "./new-customer-fields";
import ServiceSelect from "./service-select";
import SourceSelect from "./source-select";
import BookingDateTime from "./booking-date-time";
import BookingNotes from "./booking-notes";

export default function BookingForm() {
  const [customerId, setCustomerId] = useState<string>();
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [sourceId, setSourceId] = useState<string>();
  const [bookingDate, setBookingDate] = useState<Date>();
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // mutation later
      }}
      className="space-y-6 p-4 sm:p-6 lg:p-8"
    >
      {/* Form fields will go here */}
      {!isCreatingCustomer ? (
        <CustomerSearch
          value={customerId}
          onChange={setCustomerId}
          onAddNew={() => setIsCreatingCustomer(true)}
        />
      ) : (
        <NewCustomerFields
          onCancel={() => {
            setIsCreatingCustomer(false);
          }}
          onCreated={(newCustomerId) => {
            setCustomerId(newCustomerId);
            setIsCreatingCustomer(false);
          }}
        />
      )}

      <ServiceSelect value={serviceIds} onChange={setServiceIds} />
      <SourceSelect value={sourceId} onChange={setSourceId} />

      <BookingDateTime
        date={bookingDate}
        time={bookingTime}
        onDateChange={setBookingDate}
        onTimeChange={setBookingTime}
      />

      <BookingNotes value={notes} onChange={setNotes} />

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
