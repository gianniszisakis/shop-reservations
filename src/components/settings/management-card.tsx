"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ManagementCardField {
  label: string;
  value?: string | number | null;
}

interface ManagementCardProps {
  title: string;
  icon: React.ReactNode;
  fields: ManagementCardField[];
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ManagementCard({
  title,
  icon,
  fields,
  isActive,
  onEdit,
  onDelete,
}: ManagementCardProps) {
  return (
    <Card className="w-full overflow-hidden rounded-2xl p-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start">
          {/* Main entity icon */}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
            {icon}
          </div>

          {/* Title + mobile badge */}
          <div className="min-w-0 flex-1">
            <h3 className="wrap-break-word text-base font-semibold leading-5 sm:text-lg">
              {title}
            </h3>

            {/* Mobile status */}
            <Badge
              variant="outline"
              className={`mt-2 w-fit rounded-full px-2.5 py-1 text-xs font-medium sm:hidden ${
                isActive
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-muted bg-muted text-muted-foreground"
              }`}
            >
              <span
                className={`mr-1.5 size-1.5 rounded-full ${
                  isActive ? "bg-green-500" : "bg-muted-foreground"
                }`}
              />

              {isActive ? "Ενεργό" : "Ανενεργό"}
            </Badge>
          </div>

          {/* Desktop status */}
          <Badge
            variant="outline"
            className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:flex ${
              isActive
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-muted bg-muted text-muted-foreground"
            }`}
          >
            <span
              className={`mr-1.5 size-1.5 rounded-full ${
                isActive ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />

            {isActive ? "Ενεργό" : "Ανενεργό"}
          </Badge>
        </div>

        {/* Fields */}
        <div
          className={`mt-5 grid grid-cols-1 gap-3 ${
            fields.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {fields.map((field) => (
            <div
              key={field.label}
              className="min-w-0 rounded-xl border bg-muted/20 px-4 py-3"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {field.label}
              </p>

              <p className="mt-1 wrap-break-word text-sm font-semibold text-foreground">
                {field.value === null ||
                field.value === undefined ||
                field.value === ""
                  ? "-"
                  : field.value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onEdit}
            className="w-full rounded-xl sm:w-auto"
          >
            <Pencil className="mr-2 size-4" />
            Επεξεργασία
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="w-full rounded-xl sm:w-auto"
          >
            <Trash2 className="mr-2 size-4" />
            Διαγραφή
          </Button>
        </div>
      </div>
    </Card>
  );
}
