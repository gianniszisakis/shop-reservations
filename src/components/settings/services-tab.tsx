"use client";

import { useMemo, useState } from "react";
import { Briefcase, Plus, Search } from "lucide-react";

import { useServices } from "@/features/services/queries";
import type { Service } from "@/features/services/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ErrorState from "@/components/shared/error-state";
import ManagementCard from "./management-card";

export default function ServicesTab() {
  const [search, setSearch] = useState("");

  const { data: services, isLoading, isError } = useServices();

  const filteredServices = useMemo(() => {
    const value = search.trim().toLocaleLowerCase();

    if (!value) {
      return services ?? [];
    }

    return (
      services?.filter((service) =>
        service.name.toLocaleLowerCase().includes(value),
      ) ?? []
    );
  }, [services, search]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mt-1 text-sm text-muted-foreground">
            Διαχείριση υπηρεσιών
          </p>
        </div>

        <Button
          type="button"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          Νέα υπηρεσία
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Αναζήτηση υπηρεσίας..."
          className="h-11 rounded-xl pl-11 sm:h-12"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ManagementCardSkeleton />
          <ManagementCardSkeleton />
          <ManagementCardSkeleton />
          <ManagementCardSkeleton />
        </div>
      )}

      {/* Error */}
      {isError && <ErrorState message="Αδυναμία φόρτωσης υπηρεσιών" />}

      {/* Services */}
      {!isLoading && !isError && filteredServices.length > 0 && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredServices.map((service) => (
            <ManagementCard
              key={service.id}
              title={service.name}
              icon={<Briefcase className="size-5" />}
              isActive={service.isActive}
              fields={[
                {
                  label: "Τιμή",
                  value: `€${service.price}`,
                },
                {
                  label: "Διάρκεια",
                  value: `${service.durationMinutes} λεπτά`,
                },
              ]}
              onEdit={() => {
                console.log("Edit service:", service.id);
              }}
              onDelete={() => {
                console.log("Deactivate service:", service.id);
              }}
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && filteredServices.length === 0 && (
        <div className="rounded-2xl border border-dashed p-8 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-pink-50">
            <Briefcase className="size-5 text-pink-600" />
          </div>

          <p className="mt-3 font-medium">Δεν βρέθηκαν υπηρεσίες</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Δοκίμασε διαφορετική αναζήτηση.
          </p>
        </div>
      )}
    </div>
  );
}

function ManagementCardSkeleton() {
  return <div className="h-56 animate-pulse rounded-2xl border bg-muted/30" />;
}
