import { Container, Grid, Stack, Typography } from "@mui/material";
import { Page, ProductCard } from "components";
import { useStore } from "effector-react";
import { $products, fetchProductsFx } from "models/products";

const Products: React.FC = () => {
  const products = useStore($products);
  const isLoading = useStore(fetchProductsFx.pending);

  return (
    <Page title="Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} />
        </Stack>
        <Grid container spacing={3} data-testid="products-list">
          {isLoading &&
            [...Array(12)].map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <ProductCard skeleton />
              </Grid>
            ))}
          {!isLoading &&
            products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={3} data-testid={`product-${product.id}`}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Products;
