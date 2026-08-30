export interface Source {
  id: string;
  name: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSourceInput {
  name: string;
  displayOrder: number;
}

export interface UpdateSourceInput {
  name: string;
  displayOrder: number;
}
