import { useState, useEffect, useRef } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import { useSearch } from "../../contexts/SearchProvider";
import SearchItem from "./SearchItem";

const Search = ({ setIsOverlayOpen }) => {
  const [products, setProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchFormRef = useRef(null);
  const searchResultRef = useRef(null);
  const { searchTerm, handleSearch } = useSearch();

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedResults = searchResults.slice(0, 5);

  const searchFormWidth = searchFormRef.current?.offsetWidth || "60rem";

  const handleSearchItemClick = () => {
    setIsSearchFocused(false);
    setIsOverlayOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/result");
    setIsSearchFocused(false);
    setIsOverlayOpen(false);
  };

  return (
    <Container fluid className="m-0 p-0" style={{ zIndex: 2 }}>
      <Form
        className="d-flex justify-content-between"
        onSubmit={handleSearchSubmit}
        style={{ flexGrow: "1" }}
        ref={searchFormRef}
      >
        <FormControl
          type="text"
          placeholder="Search FakeStore"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setIsSearchFocused(true);
            setIsOverlayOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              if (!searchResultRef.current?.contains(document.activeElement)) {
                setIsSearchFocused(false);
                setIsOverlayOpen(false);
              }
            }, 0);
          }}
          style={{ maxWidth: "60rem" }}
        />
      </Form>

      {isSearchFocused && (
        <>
          <div
            className="search-result bg-light px-3 py-3 rounded-3"
            style={{
              position: "fixed",
              width: searchFormWidth,
              zIndex: 2,
            }}
            ref={searchResultRef}
          >
            {limitedResults.map((product) => (
              <div
                className="py-1 py-lg-2"
                style={{ borderBottom: "1px solid grey" }}
                key={product.id}
              >
                <SearchItem
                  product={product}
                  handleSearchItemClick={handleSearchItemClick}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default Search;
