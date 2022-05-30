import { environments } from "configs";
import { ShoppingCart } from "types";
import { HttpClient } from "./http-client";

// Carts services class extends HttpClient
export class CartsServices extends HttpClient {
  private static classInstance?: CartsServices;

  private constructor() {
    // Call super class constructor with base url
    super(environments.API_URL);
  }

  // Get singleton instance
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new CartsServices();
    }

    return this.classInstance;
  }

  // Get shopping cart by user id
  public getUserCarts = (id: number) =>
    this.instance.get<ShoppingCart[]>(`/carts/user/${id}`);

  // Update shopping cart
  public updateCart = (cart: ShoppingCart) =>
    this.instance.put<ShoppingCart>(`/carts/${cart.id}`, cart);
}
