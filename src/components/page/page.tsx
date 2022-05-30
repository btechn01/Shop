import { forwardRef, useEffect } from "react";
import { Box } from "@mui/material";
import { environments } from "configs";
interface Props {
  children: React.ReactNode;
  title?: string;
}
const Page = forwardRef(({ children, title = "", ...other }: Props, ref) => {
  useEffect(() => {
    document.title = `${title} | ${environments.TITLE}`;
  }, [title]);
  return (
    <Box ref={ref} {...other}>
      {children}
    </Box>
  );
});

export default Page;
