import { CreateCustomerInput, Customer, UpdateCustomerInput } from "./types";

//Fetch customers

export async function getCustomers(search?: string): Promise<Customer[]> {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const query = params.toString();

  const response = await fetch(
    query ? `/api/customers?${query}` : "/api/customers",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

//Get customer

export async function getCustomer(id: string): Promise<Customer[]> {
  const response = await fetch(`/api/customers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load customer");
  }
  return response.json();
}

//Create new customer

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<Customer> {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to create customer");
  }

  return response.json();
}

//Update customer

export async function updateCustomer(
  id: string,
  input: UpdateCustomerInput,
): Promise<Customer> {
  const response = await fetch(`/api/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to update customer");
  }

  return response.json();
}

//Deactivate customer

export async function deactivateCustomer(id: string): Promise<Customer> {
  const response = await fetch(`/api/customers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to deactivate customer");
  }

  return response.json();
}
