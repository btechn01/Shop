import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Iconify, Page } from "components";
import { useStore } from "effector-react";
import {
  $shoppingCartProductsWithProductDetails,
  $shoppingCartTotalPrice,
  addProduct,
  fetchShoppingCartFx,
  removeProduct,
} from "models/shopping-cart";
import { useNavigate } from "react-router-dom";
import { Product } from "types";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.primary,
}));

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const shoppingCartProductsWithProductDetails = useStore(
    $shoppingCartProductsWithProductDetails
  );
  const handleContinueShopping = () => {
    navigate("/");
  };

  const shoppingCartTotalPrice = useStore($shoppingCartTotalPrice);
  const isLoading = useStore(fetchShoppingCartFx.pending);
  const handleOnAddToCart = (product: Product) => () => {
    addProduct(product.id);
  };
  const handleOnRemoveFromCart = (product: Product) => () => {
    removeProduct(product.id);
  };
  return (
    <Page title="Shopping Cart">
      <Container>
        <CardStyle elevation={24}>
          <Box p={4}>
            <Typography variant="h5">Shopping Cart</Typography>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box p={4}>
            {isLoading && (
              <List>
                {[...Array(3)].map((_, i) => (
                  <ListItem disableGutters key={i}>
                    <ListItemAvatar>
                      <Skeleton variant="rectangular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Stack spacing={2}>
                        <Skeleton
                          variant="rectangular"
                          width={250}
                          height={20}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={20}
                        />
                      </Stack>
                    </ListItemText>
                    <ListItemIcon>
                      <Stack spacing={2}>
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={20}
                        />
                        <Stack direction="row" spacing={2}>
                          <Skeleton variant="circular" height={20} width={20} />
                          <Skeleton variant="circular" height={20} width={20} />
                        </Stack>
                      </Stack>
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            )}
            <List data-testid="shopping-cart-product-list">
              {!isLoading &&
                shoppingCartProductsWithProductDetails.map(
                  ({ product, quantity, productId }) => (
                    <ListItem disableGutters key={productId}>
                      <ListItemAvatar>
                        <img
                          src={product.image}
                          alt={product.title}
                          width={48}
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Stack spacing={2}>
                          <Typography variant="h6" noWrap>
                            {product.title}
                          </Typography>
                          <Typography variant="body2" noWrap>
                            {quantity} x ${product.price}
                          </Typography>
                        </Stack>
                      </ListItemText>
                      <ListItemIcon>
                        <Stack spacing={2}>
                          <Typography
                            variant="body2"
                            noWrap
                            data-testid={`shopping-cart-product-price-${productId}`}
                          >
                            ${product.price * quantity}
                          </Typography>

                          <ButtonGroup size="small">
                            <IconButton
                              size="small"
                              onClick={handleOnRemoveFromCart(product)}
                              data-testid={`shopping-cart-remove-product-${productId}`}
                            >
                              <Iconify icon="eva:minus-circle-outline" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={handleOnAddToCart(product)}
                              data-testid={`shopping-cart-add-product-${productId}`}
                            >
                              <Iconify icon="eva:plus-circle-outline" />
                            </IconButton>
                          </ButtonGroup>
                        </Stack>
                      </ListItemIcon>
                    </ListItem>
                  )
                )}
            </List>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box p={4}>
            <Stack direction="row-reverse" spacing={2} alignItems="center">
              <Typography variant="h5" data-testid="shopping-cart-total">
                ${shoppingCartTotalPrice}
              </Typography>
              <Typography variant="h6">Total:</Typography>
            </Stack>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box p={4}>
            <Stack direction="row-reverse">
              <ButtonGroup size="large">
                <Button onClick={handleContinueShopping} data-testid="shopping-cart-continue-shopping">
                  Continue Shopping
                </Button>
                <Button>Checkout</Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </CardStyle>
      </Container>
    </Page>
  );
};

export default ShoppingCart;
