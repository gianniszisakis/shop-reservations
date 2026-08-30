import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSource, deactivateSource, updateSource } from "./api";

import type { CreateSourceInput, UpdateSourceInput } from "./types";

export function useCreateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSourceInput) => createSource(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sources"],
      });
    },
  });
}

export function useUpdateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSourceInput }) =>
      updateSource(id, input),

    onSuccess: (source) => {
      queryClient.invalidateQueries({
        queryKey: ["sources"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sources", source.id],
      });
    },
  });
}

export function useDeactivateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateSource(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sources"],
      });
    },
  });
}
