import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import { MenuPopover, Iconify } from "components";
import { useStore } from "effector-react";
import {
  $shoppingCartItemsCount,
  $shoppingCartProductsWithProductDetails,
  $shoppingCartTotalPrice,
  addProduct,
  removeProduct,
} from "models/shopping-cart";
import { Product } from "types";
import { useNavigate } from "react-router-dom";

const ShoppingCartPopover: React.FC = () => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const shoppingCartItemsCount = useStore($shoppingCartItemsCount);
  const navigate = useNavigate();
  const shoppingCartProductsWithProductDetails = useStore(
    $shoppingCartProductsWithProductDetails
  );
  const shoppingCartTotalPrice = useStore($shoppingCartTotalPrice);

  const handleOnClickViewCart = () => {
    navigate("/shopping-cart");
    handleClose();
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAddToCart = (product: Product) => () => {
    addProduct(product.id);
  };

  const handleRemoveFromCart = (product: Product) => () => {
    removeProduct(product.id);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ width: 40, height: 40 }} data-testid="shopping-cart-popover">
        <Badge
          showZero
          badgeContent={shoppingCartItemsCount}
          color="error"
          max={99}
        >
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          width: 300,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <List>
          {shoppingCartProductsWithProductDetails.map((item) => (
            <ListItem key={item.productId}>
              <ListItemAvatar sx={{ minWidth: 28 }}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  width={20}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography width={150} noWrap>
                  {item.product.title}
                </Typography>
              </ListItemText>
              <ListItemSecondaryAction>
                <ButtonGroup>
                  <IconButton
                    size="small"
                    onClick={handleRemoveFromCart(item.product)}
                    data-testid={`shopping-cart-popover-remove-from-cart-${item.productId}`}
                  >
                    <Iconify icon="eva:minus-circle-outline" />
                  </IconButton>
                  <Typography variant="h6" data-testid={`shopping-cart-popover-quantity-${item.productId}`}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={handleAddToCart(item.product)}
                    data-testid={`shopping-cart-popover-add-to-cart-${item.productId}`}
                  >
                    <Iconify icon="eva:plus-circle-outline" />
                  </IconButton>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {shoppingCartProductsWithProductDetails.length === 0 && (
            <ListItem>
              <ListItemText>
                <Typography variant="body2">
                  Your shopping cart is empty
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </List>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ px: 3 }}>
          <Stack direction="row-reverse" alignItems={"center"} spacing={1}>
            <Typography variant="h6" sx={{ ml: 1 }} color="GrayText" data-testid="shopping-cart-popover-total">
              ${shoppingCartTotalPrice}
            </Typography>
            <Typography variant="h6" color="GrayText">
              Total:
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Stack direction="row-reverse">
            <Button
              fullWidth
              variant="contained"
              onClick={handleOnClickViewCart}
              data-testid="shopping-cart-popover-view-cart"
            >
              View cart
            </Button>
          </Stack>
        </Box>
      </MenuPopover>
    </>
  );
};

export default ShoppingCartPopover;
