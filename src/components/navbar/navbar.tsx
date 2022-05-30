import { Box, IconButton, Stack } from "@mui/material";
import { Iconify, Searchbar, ShoppingCartPopover } from "components";
import { openSidebar } from "models/sidebar";
import { RootStyle, ToolbarStyle } from "./styles";

const Navbar: React.FC = () => {
  const handleSidebarOpen = () => openSidebar();
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={handleSidebarOpen}
          data-testid="navbar-mobile-menu"
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <ShoppingCartPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
