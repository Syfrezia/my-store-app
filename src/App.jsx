import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ResultPage from "./pages/ResultPage";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Router>
      <Header
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isFilterOpen={isFilterOpen}
        handleFilter={handleFilter}
      />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/result"
          element={<ResultPage searchTerm={searchTerm} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
