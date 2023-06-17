import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { AppProvider } from "../src/components/Context/ContextManagement";
import { CartProvider } from "./components/Context/CartContext";

function App() {
  return (
    <CartProvider>
      <AppProvider>
        <Cart />
        <Header />
      </AppProvider>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;