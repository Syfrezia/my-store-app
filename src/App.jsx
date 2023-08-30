import { useState } from "react";
import Home from "./pages";
import ProductPage from "./pages/productPage";
import CategoryPage from "./pages/categoryPage";
import ResultPage from "./pages/resultPage";
import Header from "./containers/header";
import Footer from "./containers/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <Header searchTerm={searchTerm} handleSearch={handleSearch} />
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
