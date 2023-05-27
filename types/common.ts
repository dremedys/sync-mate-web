export interface Option<T = string> {
  value: T;
  label: string;
}

export type Params = {
  page: number;
  limit: number;
  search?: string;
};
