import { useState, useEffect, useRef } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import { getProducts } from "../services/api";
import SearchItem from "./searchItem";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchFormRef = useRef(null);
  const searchResultRef = useRef(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedResults = searchResults.slice(0, 5);

  const searchFormWidth = searchFormRef.current?.offsetWidth || "60rem"; // Default width if ref not available

  const handleSearchItemClick = () => {
    setIsSearchFocused(false);
  };

  return (
    <Container fluid className="m-0 p-0">
      <Form
        className="d-flex justify-content-between"
        onSubmit={(e) => e.preventDefault()}
        style={{ flexGrow: "1" }}
        ref={searchFormRef}
      >
        <FormControl
          type="text"
          placeholder="Search FakeStore"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              if (!searchResultRef.current?.contains(document.activeElement)) {
                setIsSearchFocused(false);
              }
            }, 0);
          }}
          style={{ maxWidth: "60rem" }}
        />
      </Form>

      {isSearchFocused && (
        <>
          <div
            className="overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: -1,
            }}
          ></div>
          <div
            className="search-result bg-light px-3 py-3 rounded-3"
            style={{
              position: "fixed",
              width: searchFormWidth,
              zIndex: 10,
            }}
            ref={searchResultRef}
          >
            {limitedResults.map((product) => (
              <div
                className="py-lg-2"
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
