"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

import { useServices } from "@/features/services/queries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceSelectProps {
  value: string[];
  onChange: (serviceIds: string[]) => void;
}

export default function ServiceSelect({ value, onChange }: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: services, isLoading, isError } = useServices();

  const selectedServices =
    services?.filter((service) => value.includes(service.id)) ?? [];

  const filteredServices =
    services?.filter((service) =>
      service.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    ) ?? [];

  function toggleService(serviceId: string) {
    if (value.includes(serviceId)) {
      onChange(value.filter((id) => id !== serviceId));
      return;
    }

    onChange([...value, serviceId]);
  }

  function removeService(serviceId: string) {
    onChange(value.filter((id) => id !== serviceId));
  }

  return (
    <div className="space-y-3">
      <Label>Υπηρεσίες</Label>

      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((current) => !current)}
        className="min-h-12 w-full justify-between rounded-xl px-4 py-3"
      >
        <span
          className={value.length > 0 ? "text-left" : "text-muted-foreground"}
        >
          {value.length === 0
            ? "Επιλέξτε υπηρεσίες"
            : `${value.length} ${
                value.length === 1 ? "υπηρεσία" : "υπηρεσίες"
              } επιλεγμένες`}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Inline service selector */}
      {open && (
        <div className="w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
          {/* Search */}
          <div className="border-b p-3">
            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Αναζήτηση υπηρεσίας..."
              className="h-11 rounded-xl"
            />
          </div>

          {/* Services */}
          <div className="max-h-[50dvh] overflow-y-auto">
            {isLoading && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Φόρτωση υπηρεσιών...
              </div>
            )}

            {isError && (
              <div className="p-6 text-center text-sm text-destructive">
                Αποτυχία φόρτωσης υπηρεσιών.
              </div>
            )}

            {!isLoading && !isError && filteredServices.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Δεν βρέθηκε υπηρεσία.
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredServices.map((service) => {
                const isSelected = value.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className="
                      flex
                      w-full
                      items-start
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
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-pink-600 bg-pink-600 text-white"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="whitespace-normal break-words text-sm font-medium leading-5">
                        {service.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {service.durationMinutes} λεπτά
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold">
                      €{service.price}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Selected services */}
      {selectedServices.length > 0 && (
        <div className="space-y-2">
          {selectedServices.map((service) => (
            <div
              key={service.id}
              className="flex items-start gap-3 rounded-xl border bg-pink-50/60 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="whitespace-normal break-words text-sm font-medium leading-5">
                  {service.name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {service.durationMinutes} λεπτά · €{service.price}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeService(service.id)}
                className="mt-0.5 rounded-md p-1 text-muted-foreground transition hover:bg-white hover:text-foreground"
                aria-label={`Αφαίρεση ${service.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
