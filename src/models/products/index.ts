import { Product } from "types";
import { createDomain } from "effector";

// create products domain
export const productsDomain = createDomain("products");

// create products store
export const $products = productsDomain.createStore<Product[]>([]);

// create fetch products effect which will be fetch products from server and set it to store
export const fetchProductsFx = productsDomain.createEffect<void, Product[]>();

// create get products event which will trigger fetchProductsFx
export const getProducts = productsDomain.createEvent<void>();
