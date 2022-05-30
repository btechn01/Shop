import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  styled,
  Chip,
  Rating,
  Skeleton,
} from "@mui/material";
import { Product } from "types";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

interface Props {
  product?: Product;
  skeleton?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, skeleton }) => {
  if (skeleton || !product) {
    return (
      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          <Skeleton
            variant="rectangular"
            width={130}
            height={32}
            sx={{
              position: "absolute",
              zIndex: 9,
              top: 16,
              right: 16,
              borderRadius: 10,
            }}
          />
          <Skeleton
            variant="rectangular"
            animation={false}
            sx={{
              backgroundColor: "grey.200",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Skeleton variant="text" width={150} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={40} />
          </Stack>
        </Stack>
      </Card>
    );
  }

  const { title, category, image, id, rating, price } = product;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Chip
          label={category}
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            textTransform: "uppercase",
          }}
        />
        <ProductImgStyle alt={title} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/products/${id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Rating readOnly value={rating.rate} />
          </Stack>
          <Typography variant="subtitle1">${price}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductCard;
