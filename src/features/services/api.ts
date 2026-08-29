import type { CreateServiceInput, Service, UpdateServiceInput } from "./types";

export async function getServices(): Promise<Service[]> {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error("Failed to load services");
  }
  return response.json();
}

export async function createService(
  input: CreateServiceInput,
): Promise<Service> {
  const response = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to create service");
  }

  return response.json();
}

export async function updateService(
  id: string,
  input: UpdateServiceInput,
): Promise<Service> {
  const response = await fetch(`/api/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to update service");
  }

  return response.json();
}

export async function deactivateService(id: string): Promise<Service> {
  const response = await fetch(`/api/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to deactivate service");
  }

  return response.json();
}
