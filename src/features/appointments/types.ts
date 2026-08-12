export interface AppointmentService {
  service: {
    id: string;
    name: string;
    price: string;
    durationMinutes: number;
  };
}

export interface AppointmentCustomer {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
}

export interface AppointmentSource {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  sourceId: string;
  startDateTime: string;
  endDateTime: string;
  notes: string | null;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  customer: AppointmentCustomer;
  source: AppointmentSource;
  services: AppointmentService[];
}
