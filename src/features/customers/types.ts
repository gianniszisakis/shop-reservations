export interface Customer {
  id: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerInput {
  fullName: string;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
}

export interface UpdateCustomerInput {
  fullName?: string;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
  isActive?: boolean;
}
