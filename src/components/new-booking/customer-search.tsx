"use client";

import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

import { useCustomers } from "@/features/customers/queries";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CustomerSearchProps {
  value?: string;
  onChange: (customerId: string) => void;
  onAddNew: () => void;
}

export default function CustomerSearch({
  value,
  onChange,
  onAddNew,
}: CustomerSearchProps) {
  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const { data: customers, isLoading, isError } = useCustomers(search);

  function handleSearch() {
    const value = searchInput.trim();

    if (!value) {
      return;
    }

    setSearch(value);
  }

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customer-search">Πελάτης</Label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="customer-search"
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Αναζήτηση με όνομα, τηλέφωνο ή email..."
            className="h-12 rounded-xl"
          />

          <Button
            type="button"
            onClick={handleSearch}
            disabled={!searchInput.trim() || isLoading}
            className="h-12 gap-2 rounded-xl bg-pink-600 px-6 hover:bg-pink-500"
          >
            <Search className="h-4 w-4" />

            {isLoading ? "Αναζήτηση..." : "Αναζήτηση"}
          </Button>
        </div>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Παρουσιάστηκε πρόβλημα κατά την αναζήτηση πελατών.
        </p>
      )}

      {/* Only show results after a search */}
      {search && !isLoading && !isError && (
        <div className="space-y-2">
          {customers?.length ? (
            customers.map((customer) => (
              <button
                key={customer.id}
                type="button"
                onClick={() => onChange(customer.id)}
                className={`w-full rounded-xl border p-4 text-left transition hover:bg-pink-50 ${
                  value === customer.id ? "border-pink-500 bg-pink-50" : ""
                }`}
              >
                <p className="font-medium">{customer.fullName}</p>

                {customer.phone && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {customer.phone}
                  </p>
                )}

                {customer.email && (
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                )}
              </button>
            ))
          ) : (
            <div className="rounded-xl border border-dashed p-5 text-center">
              <p className="text-sm text-muted-foreground">
                Δεν βρέθηκε πελάτης.
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={onAddNew}
        className="w-full gap-2 rounded-xl border-pink-200 sm:w-auto"
      >
        <UserPlus className="h-4 w-4" />
        Προσθήκη νέου πελάτη
      </Button>
    </section>
  );
}
