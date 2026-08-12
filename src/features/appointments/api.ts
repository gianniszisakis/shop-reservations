import { Appointment } from "./types";

export async function getAppointments(): Promise<Appointment[]> {
  const response = await fetch("/api/appointments");
  if (!response.ok) {
    throw new Error("Failed to load appointments");
  }
  return response.json();
}

export async function getAppointment(id: string): Promise<Appointment> {
  const response = await fetch(`/api/appointments/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load appointment");
  }
  return response.json();
}
