import { Customer } from "./types";

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch("/api/customers");
  if (!response.ok) {
    throw new Error("Failed to load customers");
  }
  return response.json();
}

export async function getCustomer(id: string): Promise<Customer[]> {
  const response = await fetch(`/api/customers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load customer");
  }
  return response.json();
}
