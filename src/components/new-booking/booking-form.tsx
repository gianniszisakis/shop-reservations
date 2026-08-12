"use client";

import { Button } from "../ui/button";

export default function BookingForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // mutation later
      }}
      className="space-y-6 p-4 sm:p-6 lg:p-8"
    >
      {/* Form fields will go here */}

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
