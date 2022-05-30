import { Product } from "types";
import { createDomain } from "effector";

// create product domain
export const productDomain = createDomain("product");

// create product store
export const $product = productDomain.createStore<Product | null>(null);

// create fetch product event which will be fetch product from server and set it to store
export const fetchProductFx = productDomain.createEffect<number, Product>();

// create get product event which will trigger fetchProductFx
export const getProduct = productDomain.createEvent<number>();

// create reset product event which will trigger when productPageGate close to reset product store
export const resetProduct = productDomain.createEvent<void>();
