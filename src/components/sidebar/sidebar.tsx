import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar, Skeleton } from "@mui/material";

import { useStore } from "effector-react";
import { $isSidebarOpen, closeSidebar } from "models/sidebar";
import { useResponsive } from "hooks";
import { Scrollbar, Navigation } from "components";
import { NAV_ITEMS } from "constant";
import { $user, fetchUserFx } from "models/user";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[300],
}));

const Sidebar: React.FC = () => {
  const isOpenSidebar = useStore($isSidebarOpen);
  const user = useStore($user);
  const isLoading = useStore(fetchUserFx.pending);
  const { pathname } = useLocation();

  const isDesktop = useResponsive({ query: "up", key: "lg" });
  const onCloseSidebar = () => closeSidebar();

  useEffect(() => {
    if (isOpenSidebar) {
      closeSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      data-testid="sidebar-sidemenu"
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Box sx={{ width: 239 }}>
          <img src={"/assets/img/logo.svg"} alt="logo" />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={"/assets/img/avatar_default.jpeg"} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              {isLoading && <Skeleton variant="text" width={100} />}
              {!isLoading && (
                <Typography data-testid={"sidebar-user-name"} variant="subtitle2" sx={{ color: "text.primary" }}>
                  {[user?.name.firstname, user?.name.lastname].join(" ")}
                </Typography>
              )}
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <Navigation items={NAV_ITEMS} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default Sidebar;
