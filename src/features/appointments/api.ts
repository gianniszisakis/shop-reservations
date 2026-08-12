import {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "./types";

//fetch appointments
export async function getAppointments(): Promise<Appointment[]> {
  const response = await fetch("/api/appointments");
  if (!response.ok) {
    throw new Error("Failed to load appointments");
  }
  return response.json();
}

//fetch appointment by id
export async function getAppointment(id: string): Promise<Appointment> {
  const response = await fetch(`/api/appointments/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load appointment");
  }
  return response.json();
}

//create appointment
export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to create appointment");
  }

  return response.json();
}

//update appointment
export async function updateAppointment(
  id: string,
  input: UpdateAppointmentInput,
): Promise<Appointment> {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to update appointment");
  }

  return response.json();
}

//cancel appointment
export async function cancelAppointment(id: string): Promise<Appointment> {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "CANCELLED",
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error ?? "Failed to cancel appointment");
  }

  return response.json();
}
