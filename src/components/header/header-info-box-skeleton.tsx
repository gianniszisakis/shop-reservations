import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderInfoBoxSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
      {/* Calendar icon */}
      <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />

      {/* Text */}
      <Skeleton className="h-4 w-24 rounded-full" />
    </div>
  );
}
