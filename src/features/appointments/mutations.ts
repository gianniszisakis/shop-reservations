import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment, updateAppointment, cancelAppointment } from "./api";
import type { CreateAppointmentInput, UpdateAppointmentInput } from "./types";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAppointmentInput) => createAppointment(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateAppointmentInput;
    }) => updateAppointment(id, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["appointments", variables.id],
      });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelAppointment(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["appointments", id],
      });
    },
  });
}
