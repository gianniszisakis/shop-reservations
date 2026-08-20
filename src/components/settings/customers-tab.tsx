"use client";

import { useMemo, useState } from "react";
import { Plus, Search, User } from "lucide-react";

import { useAllCustomers } from "@/features/customers/queries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorState from "@/components/shared/error-state";

import ManagementCard from "./management-card";
import ManagementrCardSkeleton from "./management-card-loading";
import { Customer } from "@/features/customers/types";
import CustomerEditSheet from "./customer-edit-sheet";

export default function CustomersTab() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const { data: customers, isLoading, isError } = useAllCustomers();

  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLocaleLowerCase();

    if (!value) {
      return customers ?? [];
    }

    return (
      customers?.filter((customer) => {
        return (
          customer.fullName.toLocaleLowerCase().includes(value) ||
          customer.phone?.toLocaleLowerCase().includes(value) ||
          customer.email?.toLocaleLowerCase().includes(value)
        );
      }) ?? []
    );
  }, [customers, search]);

  return (
    <>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mt-1 text-sm text-muted-foreground">
              Διαχείριση πελατών
            </p>
          </div>

          <Button
            type="button"
            className="w-full gap-2 rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
          >
            <Plus className="size-4" />
            Νέος πελάτης
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Αναζήτηση με όνομα, τηλέφωνο ή email..."
            className="h-12 rounded-xl pl-11"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ManagementrCardSkeleton />
            <ManagementrCardSkeleton />
            <ManagementrCardSkeleton />
          </div>
        )}

        {/* Error */}
        {isError && <ErrorState message="Αδυναμία φόρτωσης πελατών" />}

        {/* Customers */}
        {!isLoading && !isError && filteredCustomers.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredCustomers.map((customer) => (
              <ManagementCard
                key={customer.id}
                title={customer.fullName}
                icon={<User className="size-5" />}
                isActive={customer.isActive}
                fields={[
                  {
                    label: "Τηλέφωνο",
                    value: customer.phone,
                  },
                  {
                    label: "Email",
                    value: customer.email,
                  },
                ]}
                onEdit={() => setSelectedCustomer(customer)}
                onDelete={() => {
                  console.log("Delete:", customer.id);
                }}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filteredCustomers.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pink-50">
              <User className="size-5 text-pink-600" />
            </div>

            <p className="mt-4 font-medium">Δεν βρέθηκαν πελάτες</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Δοκίμασε διαφορετική αναζήτηση.
            </p>
          </div>
        )}
      </div>

      <CustomerEditSheet
        customer={selectedCustomer}
        open={selectedCustomer !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCustomer(null);
          }
        }}
      />
    </>
  );
}
