import { Icon } from "@iconify/react";
import { Box, SxProps, Theme } from "@mui/material";

interface Props {
  icon: string;
  sx?: SxProps<Theme>;
  width?: number;
  height?: number;
}

const Iconify: React.FC<Props> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
