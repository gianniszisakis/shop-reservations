export async function getServices() {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error("Failed to load services");
  }
  return response.json();
}
