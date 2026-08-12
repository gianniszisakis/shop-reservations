import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer, deactivateCustomer } from "./api";
import { CreateCustomerInput, UpdateCustomerInput } from "./types";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCustomerInput) => createCustomer(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCustomerInput }) =>
      updateCustomer(id, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customers", variables.id],
      });
    },
  });
}

export function useDeactivateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateCustomer(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customers", id],
      });
    },
  });
}
