import { sample } from "effector";
import { $user } from "models/user";
import { throttle } from "patronum";
import { CartsServices } from "services";
import { User } from "types";
import {
  $shoppingCartProducts,
  addProduct,
  removeProduct,
  fetchShoppingCartFx,
  $shoppingCartDate,
  updateShoppingCartFx,
  $shoppingCartId,
  $shoppingCart,
} from ".";

// Create carts services instance
const cartsServices = CartsServices.getInstance();

// Fetch shopping carts for user and return first cart
fetchShoppingCartFx.use(async (id) => {
  const { data } = await cartsServices.getUserCarts(id);
  return data[0];
});

// Update shopping cart
updateShoppingCartFx.use(async (shoppingCart) => {
  const { data } = await cartsServices.updateCart(shoppingCart);
  return data;
});

$shoppingCartId
  // On fetchShoppingCartFx effect finished set shopping cart id
  .on(fetchShoppingCartFx.doneData, (_, data) => data.id);

$shoppingCartDate
  // On fetchShoppingCartFx effect finished set shopping cart date
  .on(fetchShoppingCartFx.doneData, (_, shoppingCart) => shoppingCart.date);

$shoppingCartProducts
  // on addProduct event, add product if it's not in shopping cart with quantity 1 or increase quantity by 1
  .on(addProduct, (state, productId) => {
    const product = state.find((p) => p.productId === productId);
    if (product) {
      return state.map((p) =>
        p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    return [...state, { productId, quantity: 1 }];
  })
  // On removeProduct event, remove product if it's in shopping cart with quantity 1 or decrease quantity by 1
  .on(removeProduct, (state, productId) => {
    const product = state.find((p) => p.productId === productId);
    if (product && product.quantity > 1) {
      return state.map((p) =>
        p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
    }
    return state.filter((p) => p.productId !== productId);
  })
  // On fetchShoppingCartFx effect finished set shopping cart products
  .on(fetchShoppingCartFx.doneData, (_, shoppingCart) => shoppingCart.products);

// If user exist then pass user.id to fetchShoppingCartFx effect and call it
sample({
  source: $user,
  filter: (user): user is User => user !== null,
  fn: (user: User) => user.id,
  target: fetchShoppingCartFx,
});

// If addProduct or removeProduct events called wait for 1 sec after last event then call updateShoppingCartFx effect with latest shoppingCart
sample({
  source: $shoppingCart,
  clock: [
    throttle({ source: addProduct, timeout: 1000 }),
    throttle({ source: removeProduct, timeout: 1000 }),
  ],
  target: updateShoppingCartFx,
});
