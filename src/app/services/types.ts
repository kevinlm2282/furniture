export type BackendResponse<T> = {
  data: T;
  message: string;
  success: boolean;
}

export type Page<T> = {
  content: T[];
  totalElements: number;
}

export type Item = {
  id: string;
  name: string;
  fabricationCost: string;
  sellPrice: number;
  color: number;
  category: string;
  imageUrl: string;
}