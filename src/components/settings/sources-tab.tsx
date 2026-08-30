"use client";

import { useMemo, useState } from "react";
import { Globe, Plus, Search } from "lucide-react";

import { useSources } from "@/features/sources/queries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ErrorState from "@/components/shared/error-state";
import ManagementCard from "./management-card";
import ManagementrCardSkeleton from "./management-card-loading";

export default function SourcesTab() {
  const [search, setSearch] = useState("");

  const { data: sources, isLoading, isError } = useSources();

  const filteredSources = useMemo(() => {
    const value = search.trim().toLocaleLowerCase();

    if (!value) {
      return sources ?? [];
    }

    return (
      sources?.filter((source) =>
        source.name.toLocaleLowerCase().includes(value),
      ) ?? []
    );
  }, [sources, search]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mt-1 text-sm text-muted-foreground">
            Διαχείριση πηγών κρατήσεων
          </p>
        </div>

        <Button
          type="button"
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-500 sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          Νέα πηγή
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Αναζήτηση πηγής..."
          className="h-11 rounded-xl pl-11 sm:h-12"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ManagementrCardSkeleton />
          <ManagementrCardSkeleton />
          <ManagementrCardSkeleton />
          <ManagementrCardSkeleton />
        </div>
      )}

      {/* Error */}
      {isError && <ErrorState message="Αδυναμία φόρτωσης πηγών" />}

      {/* Sources */}
      {!isLoading && !isError && filteredSources.length > 0 && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredSources.map((source) => (
            <ManagementCard
              key={source.id}
              title={source.name}
              icon={<Globe className="size-5" />}
              isActive={source.isActive}
              fields={[
                {
                  label: "Σειρά εμφάνισης",
                  value: source.displayOrder,
                },
              ]}
              onEdit={() => {
                console.log("Edit source:", source.id);
              }}
              onDelete={() => {
                console.log("Deactivate source:", source.id);
              }}
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && filteredSources.length === 0 && (
        <div className="rounded-2xl border border-dashed p-8 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-pink-50">
            <Globe className="size-5 text-pink-600" />
          </div>

          <p className="mt-3 font-medium">Δεν βρέθηκαν πηγές</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Δοκίμασε διαφορετική αναζήτηση.
          </p>
        </div>
      )}
    </div>
  );
}
