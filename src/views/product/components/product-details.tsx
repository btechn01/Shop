import {
  Rating,
  Skeleton,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Iconify } from "components";
import { useStoreMap } from "effector-react";
import {
  $shoppingCartProducts,
  addProduct,
  removeProduct,
} from "models/shopping-cart";
import { Product } from "types";

interface Props {
  product: Product | null;
  skeleton: boolean;
}

const ProductDetails: React.FC<Partial<Props>> = ({ product, skeleton }) => {
  const quantities: number = useStoreMap({
    store: $shoppingCartProducts,
    keys: [product?.id],
    fn: (cart, [id]) => cart.find((c) => c.productId === id)?.quantity || 0,
    updateFilter: (newValue, oldValue) => newValue !== oldValue,
  });

  const handleAddToCart = () => {
    if (product?.id) addProduct(product?.id);
  };

  const handleRemoveFromCart = () => {
    if (product?.id) removeProduct(product?.id);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack direction="row" sx={{ width: "100%" }}>
        {skeleton && (
          <Skeleton variant="text" sx={{ width: "100%", height: 28 }} />
        )}
        {!skeleton && (
          <Typography data-testid="product-title" variant="h6">
            {product?.title}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" sx={{ width: "100%", mt: 5 }}>
        {skeleton && (
          <Skeleton variant="text" sx={{ width: 200, height: 28 }} />
        )}
        {!skeleton && (
          <Typography variant="body1">Category: {product?.category}</Typography>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        {skeleton && (
          <Skeleton variant="text" sx={{ width: 250, height: 28 }} />
        )}
        {!skeleton && (
          <>
            <Typography variant="body1">Rating:</Typography>
            <Rating value={product?.rating.rate} readOnly />
            <Typography variant="body2">({product?.rating.count})</Typography>
          </>
        )}
      </Stack>
      <Stack sx={{ width: "100%" }}>
        {skeleton && (
          <Skeleton variant="text" sx={{ width: 150, height: 28 }} />
        )}
        {!skeleton && (
          <Typography variant="h4" data-testid="product-price">
            ${product?.price}
          </Typography>
        )}
      </Stack>
      <Stack sx={{ mt: 5 }}>
        {skeleton && (
          <Skeleton
            variant="rectangular"
            sx={{ width: 100, height: 28, borderRadius: 1 }}
          />
        )}
        {!skeleton && (
          <div>
            {quantities > 0 && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveFromCart}
                  data-testid="product-remove-from-cart"
                >
                  <Iconify icon="eva:minus-outline" />
                </Button>
                <Typography variant="h4" data-testid="product-quantities">
                  {quantities}
                </Typography>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleAddToCart}
                  data-testid="product-add-to-cart"
                >
                  <Iconify icon="eva:plus-outline" />
                </Button>
              </Stack>
            )}
            {!quantities && (
              <Button
                variant="contained"
                onClick={handleAddToCart}
                data-testid="product-add-to-cart-not-exist"
              >
                Add To Cart
              </Button>
            )}
          </div>
        )}
      </Stack>
    </Box>
  );
};

export default ProductDetails;
