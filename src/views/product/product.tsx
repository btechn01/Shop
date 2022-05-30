import {
  Stack,
  Container,
  Box,
  styled,
  Typography,
  Skeleton,
} from "@mui/material";
import { Page } from "components";
import { useStore } from "effector-react";
import { $product, fetchProductFx, getProduct } from "models/product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductDetails, ProductImage } from "./components";

const StackStyled = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
}));

const Product: React.FC = () => {
  const { id = 0 } = useParams();
  const product = useStore($product);
  const isLoading = useStore(fetchProductFx.pending);
  useEffect(() => {
    getProduct(+id);
  }, [id]);

  return (
    <Page title={product?.title}>
      <Container>
        <Box>
          <StackStyled spacing={4} direction="row">
            <ProductImage
              image={product?.image}
              title={product?.title}
              skeleton={isLoading}
            />
            <ProductDetails product={product} skeleton={isLoading} />
          </StackStyled>
        </Box>
        <Box sx={{ mt: 5 }}>
          {isLoading && (
            <>
              <Skeleton variant="text" width={300} />
              <Skeleton variant="text" width={250} />
              <Skeleton variant="text" width={500} />
              <Skeleton variant="text" width={800} />
            </>
          )}
          {!isLoading && (
            <Typography variant="body2">{product?.description}</Typography>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default Product;
