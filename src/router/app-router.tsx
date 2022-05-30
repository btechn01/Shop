import { MainLayout } from "layouts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Product, Products, ShoppingCart } from "views";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
