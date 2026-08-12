import { Service } from "./types";

export async function getServices(): Promise<Service[]> {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error("Failed to load services");
  }
  return response.json();
}
