import { AppRouter } from "router";
import ThemeProvider from "theme";
import { useEffect } from "react";
import { getUser } from "models/user";
import { getProducts } from "models/products";
function App() {
  useEffect(() => {
    getUser(1);
    getProducts();
  }, []);
  return (
    <div className="App">
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
