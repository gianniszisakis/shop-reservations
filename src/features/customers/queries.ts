import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomer } from "./api";

export function useCustomers(search?: string) {
  return useQuery({
    queryKey: ["customers", search ?? ""],
    queryFn: () => getCustomers(search),
    enabled: !!search?.trim(),
  });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomer(id!),
    enabled: !!id,
  });
}
