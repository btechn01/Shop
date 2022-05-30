import { combine, createDomain } from "effector";
import { $products } from "models/products";
import { $user } from "models/user";
import { ShoppingCart, ShoppingCartProduct } from "types";

// create shopping cart domain
export const shoppingCartDomain = createDomain("shopping-cart");

// create shopping cart products store
export const $shoppingCartProducts = shoppingCartDomain.createStore<
  ShoppingCartProduct[]
>([]);

// create add product event which will be add product with quantity 1 or increase quantity by 1 to shopping cart products store if exist
export const addProduct = shoppingCartDomain.createEvent<number>();

// create remove product event which will be remove product if it's in shopping cart with quantity 1 or decrease quantity by 1 to shopping cart products store
export const removeProduct = shoppingCartDomain.createEvent<number>();

// create shopping cart date store
export const $shoppingCartDate = shoppingCartDomain.createStore<string>("");

// create fetch shopping cart effect which will be fetch shopping cart from server and set it to store
export const fetchShoppingCartFx = shoppingCartDomain.createEffect<
  number,
  ShoppingCart
>();

// create shopping cart id store
export const $shoppingCartId = shoppingCartDomain.createStore<number>(0);

// create update shopping cart effect which will be update shopping cart on server
export const updateShoppingCartFx = shoppingCartDomain.createEffect<
  ShoppingCart,
  ShoppingCart
>();

// create get shopping cart event which will trigger fetchShoppingCartFx
export const getShoppingCart = shoppingCartDomain.createEvent<number>();

// create shopping cart items count store from $shoppingCartProducts
export const $shoppingCartItemsCount = combine(
  $shoppingCartProducts,
  (products) => products.reduce((acc, product) => acc + product.quantity, 0)
);

// create shopping cart with combination of $shoppingCartId, $user, $shoppingCartDate, $shoppingCartProducts
export const $shoppingCart = combine(
  $shoppingCartId,
  $user,
  $shoppingCartDate,
  $shoppingCartProducts,
  (
    shoppingCartId,
    user,
    shoppingCartDate,
    shoppingCartProducts
  ): ShoppingCart => ({
    id: shoppingCartId,
    products: shoppingCartProducts,
    date: shoppingCartDate,
    userId: user?.id || 0,
  })
);

// create shopping cart products store which include product data with combination of $products and $shoppingCartProducts
export const $shoppingCartProductsWithProductDetails = combine(
  $shoppingCartProducts,
  $products,
  (shoppingCartProducts, products) =>
    shoppingCartProducts.map((shoppingCartProduct) => {
      const product = products.find(
        (product) => product.id === shoppingCartProduct.productId
      )!;
      return {
        ...shoppingCartProduct,
        product,
      };
    }).filter((shoppingCartProduct) => !!shoppingCartProduct.product)
);

// create shopping cart total price store from $shoppingCartProductsWithProductDetails
export const $shoppingCartTotalPrice = combine(
  $shoppingCartProductsWithProductDetails,
  (shoppingCartProducts) =>
    parseFloat(
      shoppingCartProducts
        .reduce(
          (acc, { quantity, product: { price = 0 } }) => acc + quantity * price,
          0
        )
        .toFixed(2)
    )
);
