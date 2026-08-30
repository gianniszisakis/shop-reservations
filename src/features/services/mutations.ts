import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createService, updateService, deactivateService } from "./api";
import type { CreateServiceInput, UpdateServiceInput } from "./types";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateServiceInput) => createService(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateServiceInput }) =>
      updateService(id, input),

    onSuccess: (service) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      queryClient.invalidateQueries({
        queryKey: ["services", service.id],
      });
    },
  });
}

export function useDeactivateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}
