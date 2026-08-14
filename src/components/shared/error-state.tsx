import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function ErrorState({
  title = "Κάτι πήγε στραβά",
  message = "Δεν ήταν δυνατή η φόρτωση των δεδομένων.",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/40 px-6 py-10 text-center ${className ?? ""}`}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="size-6 text-red-600" aria-hidden="true" />
      </div>

      <h3 className="text-base font-semibold text-foreground">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
