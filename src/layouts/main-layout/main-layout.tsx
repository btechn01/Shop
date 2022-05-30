import { Navbar, Sidebar } from "components";
import { Outlet } from "react-router-dom";
import { MainStyle, RootStyle } from "./styles";

const MainLayout: React.FC = () => {
  return (
    <RootStyle>
      <Navbar />
      <Sidebar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
