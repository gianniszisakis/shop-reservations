import { CreateSourceInput, Source, UpdateSourceInput } from "./types";

export async function getSources(): Promise<Source[]> {
  const response = await fetch("/api/sources");
  if (!response.ok) {
    throw new Error("Failed to load sources");
  }
  return response.json();
}

export async function createSource(input: CreateSourceInput): Promise<Source> {
  const response = await fetch("/api/sources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to create source");
  }

  return response.json();
}

export async function updateSource(
  id: string,
  input: UpdateSourceInput,
): Promise<Source> {
  const response = await fetch(`/api/sources/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to update source");
  }

  return response.json();
}

export async function deactivateSource(id: string): Promise<Source> {
  const response = await fetch(`/api/sources/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to deactivate source");
  }

  return response.json();
}
