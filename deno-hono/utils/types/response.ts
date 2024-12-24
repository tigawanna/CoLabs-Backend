export interface BaseRecord extends Record<string, unknown> {
  id: string;
  created_at: string;
  updated_at: string;
}

export type OneRecord<T extends BaseRecord> = T;

export interface ListRecord<T extends BaseRecord> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}



