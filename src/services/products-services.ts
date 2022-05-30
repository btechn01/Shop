import { environments } from "configs";
import { Product } from "types";
import { HttpClient } from "./http-client";

// Products services class extends HttpClient
export class ProductsServices extends HttpClient {
  private static classInstance?: ProductsServices;

  private constructor() {
    // Call super class constructor with base url
    super(environments.API_URL);
  }

  // Get singleton instance
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProductsServices();
    }

    return this.classInstance;
  }

  // Get products
  public getProducts = () => this.instance.get<Product[]>("/products");

  // Get product by id
  public getProduct = (id: number) =>
    this.instance.get<Product>(`/products/${id}`);
}
