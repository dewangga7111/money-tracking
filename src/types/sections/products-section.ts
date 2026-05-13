import type { ActionResponse, DataResponse } from '../response';

export type KandunganItem = {
  key: string;
  value: string;
};

export type Product = {
  image: string;
  name: string;
  subtitle: string;
  badge: { label: string; cls: string };
  desc: string;
  kandungan: KandunganItem[];
  valueCls: string;
  reg: string;
};

export type ProductsData = {
  badge: string;
  title: string;
  description: string;
  products: Product[];
};

export type GetProductsResponse = DataResponse<ProductsData | null>;
export type UpdateProductsResponse = ActionResponse;
