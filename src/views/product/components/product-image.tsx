import { Skeleton, styled } from "@mui/material";

const ProductImgStyle = styled("img")(({ theme }) => ({
  objectFit: "cover",
  width: 300,
  height: 300,
  boxShadow: theme.customShadows.primary,
  borderRadius: 5,
}));

interface Props {
  image: string;
  title: string;
  skeleton: boolean;
}
const ProductImage: React.FC<Partial<Props>> = ({ skeleton, title, image }) => {
  if (skeleton) {
    return <Skeleton variant="rectangular" height={300} width={300} />;
  }
  return <ProductImgStyle src={image} alt={title} />;
};

export default ProductImage;
