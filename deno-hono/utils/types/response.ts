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


type Mali = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
};

const cows:ListRecord<Mali> = {
  page: 1,
  perPage: 10,
  totalItems: 100,
  totalPages: 10,
  items: [{
    id: "1",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
    name: "mali",
    email: "mali",
  }],
};

