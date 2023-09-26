import {
  Home,
  CategoryPage,
  ProductPage,
  ResultPage,
  CheckoutPage,
  PaymentPage,
} from "./pages";
import { Header, Footer } from "./layouts";
import ScrollToTop from "./utils/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./contexts/AppProvider";
import { useShowLayout } from "./hooks/useShowLayout";
import "./styles/App.css";

const Application = () => {
  const showLayout = useShowLayout();

  return (
    <AppProvider>
      {showLayout && <Header />}
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      {showLayout && <Footer />}
    </AppProvider>
  );
};

const App = () => (
  <Router>
    <Application />
  </Router>
);
export default App;
