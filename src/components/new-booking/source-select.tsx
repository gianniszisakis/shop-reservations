"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useSources } from "@/features/sources/queries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SourceSelectProps {
  value?: string;
  onChange: (sourceId: string) => void;
}

export default function SourceSelect({ value, onChange }: SourceSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: sources, isLoading, isError } = useSources();

  const selectedSource = sources?.find((source) => source.id === value);

  const filteredSources =
    sources?.filter((source) =>
      source.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    ) ?? [];

  function selectSource(sourceId: string) {
    onChange(sourceId);
    setOpen(false);
    setSearch("");
  }

  return (
    <div className="space-y-3">
      <Label>Πηγή κράτησης</Label>

      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((current) => !current)}
        className="min-h-12 w-full justify-between rounded-xl px-4 py-3"
      >
        <span
          className={selectedSource ? "text-left" : "text-muted-foreground"}
        >
          {selectedSource ? selectedSource.name : "Επιλέξτε πηγή κράτησης"}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Inline source selector */}
      {open && (
        <div className="w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
          {/* Search */}
          <div className="border-b p-3">
            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Αναζήτηση πηγής..."
              className="h-11 rounded-xl"
            />
          </div>

          {/* Sources */}
          <div className="max-h-[40dvh] overflow-y-auto">
            {isLoading && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Φόρτωση πηγών...
              </div>
            )}

            {isError && (
              <div className="p-6 text-center text-sm text-destructive">
                Αποτυχία φόρτωσης πηγών.
              </div>
            )}

            {!isLoading && !isError && filteredSources.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Δεν βρέθηκε πηγή.
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredSources.map((source) => {
                const isSelected = value === source.id;

                return (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => selectSource(source.id)}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-b
                      p-4
                      text-left
                      transition
                      last:border-b-0
                      hover:bg-pink-50
                    "
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-pink-600 bg-pink-600 text-white"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>

                    <span className="text-sm font-medium">{source.name}</span>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
