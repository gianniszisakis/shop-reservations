import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LatestBookingCardSkeleton() {
  return (
    <Card className="mb-4 w-full overflow-hidden p-0">
      <div className="flex">
        {/* Left color accent */}
        <div
          className="w-2 shrink-0 self-stretch bg-pink-400/30"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <Skeleton className="h-5 w-32 rounded-md" />
          </div>

          {/* Customer */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            <Skeleton className="h-5 w-36 rounded-md" />
          </div>

          {/* Services */}
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <Skeleton className="h-5 w-full max-w-52 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          {/* Source */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>

            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
        </div>

        {/* Right arrow */}
        <div className="flex shrink-0 items-center pr-4 pl-2">
          <Skeleton className="size-5 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
