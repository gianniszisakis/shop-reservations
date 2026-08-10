import { useQuery } from "@tanstack/react-query";
import { getSources } from "./api";

export function useSources() {
  return useQuery({
    queryKey: ["sources"],
    queryFn: getSources,
  });
}
