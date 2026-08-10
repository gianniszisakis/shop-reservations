export async function getSources() {
  const response = await fetch("/api/sources");
  if (!response.ok) {
    throw new Error("Failed to load sources");
  }
  return response.json();
}
