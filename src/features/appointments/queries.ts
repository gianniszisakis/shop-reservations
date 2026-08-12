import { useQuery } from "@tanstack/react-query";
import { getAppointment, getAppointments } from "./api";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}

export function useAppointment(id: string | undefined) {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointment(id!),
    enabled: !!id,
  });
}
