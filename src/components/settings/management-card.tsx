"use client";

import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ManagementCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  onEdit: () => void;
  onDeactivate?: () => void;
  onActivate?: () => void;
}

export default function ManagementCard({
  title,
  subtitle,
  icon,
  isActive,
  activeLabel = "Ενεργό",
  inactiveLabel = "Ανενεργό",
  onEdit,
  onDeactivate,
  onActivate,
}: ManagementCardProps) {
  return (
    <Card className="w-full rounded-2xl p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="wrap-break-word text-base font-semibold sm:text-lg">
                {title}
              </h3>

              {subtitle && (
                <p className="mt-1 wrap-break-word text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            <Badge
              variant="outline"
              className={
                isActive
                  ? "w-fit border-green-200 bg-green-50 text-green-700"
                  : "w-fit border-red-200 bg-red-50 text-red-700"
              }
            >
              {isActive ? activeLabel : inactiveLabel}
            </Badge>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl sm:w-auto"
              onClick={onEdit}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Επεξεργασία
            </Button>

            {isActive && onDeactivate && (
              <Button
                type="button"
                variant="destructive"
                className="w-full rounded-xl sm:w-auto"
                onClick={onDeactivate}
              >
                Απενεργοποίηση
              </Button>
            )}

            {!isActive && onActivate && (
              <Button
                type="button"
                variant="secondary"
                className="w-full rounded-xl sm:w-auto"
                onClick={onActivate}
              >
                Ενεργοποίηση
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
