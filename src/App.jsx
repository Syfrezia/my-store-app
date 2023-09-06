import { Home, CategoryPage, ProductPage, ResultPage } from "./pages";
import { Header, Footer } from "./layouts";
import ScrollToTop from "./utils/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchProvider from "./contexts/SearchProvider";
import { CartProvider } from "./contexts/CartProvider";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <SearchProvider>
        <CartProvider>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
