export interface Service {
  id: string;
  name: string;
  price: string;
  durationMinutes: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceInput {
  name: string;
  price: string;
  durationMinutes: number;
}

export interface UpdateServiceInput {
  name?: string;
  price?: string;
  durationMinutes?: number;
}
