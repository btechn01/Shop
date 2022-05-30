import { ShoppingCartProduct } from "types";

export interface ShoppingCart {
  id: number;
  userId: number;
  date: string;
  products: ShoppingCartProduct[];
}
