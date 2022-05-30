import { ProductsServices } from "services";
import { guard } from "effector";
import { $products, fetchProductsFx, getProducts } from ".";

// create products services instance
const productsServices = ProductsServices.getInstance();

// Fetch products from server
fetchProductsFx.use(async () => {
  const products = await productsServices.getProducts();
  return products.data;
});

$products
  // On fetchProductsFx effect success set products to store
  .on(fetchProductsFx.doneData, (_, products) => products)
  // On fetchProductsFx effect fail, trigger set products to default value
  .reset(fetchProductsFx.fail);

// On getProducts event trigger, check if fetchProductsFx is not pending, if not trigger fetchProductsFx (To prevent multiple fetching in parallel)
guard({
  source: fetchProductsFx.pending,
  clock: getProducts,
  filter: (source) => !source,
  target: fetchProductsFx,
});
