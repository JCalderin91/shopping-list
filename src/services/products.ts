import { Client } from "./client";

const client = new Client<Product>();

export interface Product {
  name: string;
  quantity: number;
  price: number;
  unit_type: string;
  created_at?: string;
  updated_at?: string;
}

export const Products = {
  get: (): Promise<Product[]> => {
    return client
      .all("products", { sort: [{ field: "updated_at", direction: "desc" }] })
      .then((products) => {
        return products;
      });
  },
  create: (product: Product): Promise<Product[]> => {
    return client.create(product, "products").then((product) => {
      return product;
    });
  },
  delete: (id: string): Promise<Product> => {
    return client.delete(id, "products").then((product) => {
      return product;
    });
  },
  update: (product: Product, id: string): Promise<Product> => {
    return client.update(id, product, "products").then((product) => {
      return product;
    });
  },
};
