import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomer } from "./api";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomer(id!),
    enabled: !!id,
  });
}
