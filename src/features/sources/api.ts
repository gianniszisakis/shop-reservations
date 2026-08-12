import { Source } from "./types";

export async function getSources(): Promise<Source[]> {
  const response = await fetch("/api/sources");
  if (!response.ok) {
    throw new Error("Failed to load sources");
  }
  return response.json();
}
