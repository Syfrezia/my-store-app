import { CartProvider } from "./CartProvider";
import SearchProvider from "./SearchProvider";

const AppProvider = ({ children }) => {
  return (
    <SearchProvider>
      <CartProvider>{children}</CartProvider>
    </SearchProvider>
  );
};

export default AppProvider;
