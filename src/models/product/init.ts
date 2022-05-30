import { ProductsServices } from "services";
import { forward } from "effector";
import { $product, fetchProductFx, getProduct, resetProduct } from ".";

// Create products services instance
const productsServices = ProductsServices.getInstance();

// Fetch product by id
fetchProductFx.use(async (id) => {
  const { data } = await productsServices.getProduct(id);
  return data;
});

$product
  // On fetchProductFx effect success set product to store
  .on(fetchProductFx.doneData, (_, product) => product)
  // On fetchProductFx effect fail or resetProduct event trigger set product to default value
  .reset([fetchProductFx.fail, resetProduct]);

// On getProduct event trigger fetchProductFx via getProduct parameter
forward({
  from: getProduct,
  to: fetchProductFx,
});
