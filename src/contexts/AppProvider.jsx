import { CartProvider } from "./CartProvider";
import SearchProvider from "./SearchProvider";
import { CheckoutProvider } from "./CheckoutProvider";

const AppProvider = ({ children }) => {
  return (
    <SearchProvider>
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
    </SearchProvider>
  );
};

export default AppProvider;
