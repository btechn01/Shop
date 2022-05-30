import { forward } from "effector";
import { productPageGate } from ".";
import { resetProduct } from "models/product";

// Reset product on product page close
forward({
  from: productPageGate.close,
  to: resetProduct,
});
