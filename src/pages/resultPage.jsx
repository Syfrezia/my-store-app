import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts } from "../services/api";
import { useSearch } from "../contexts/SearchProvider";
import ProductCard from "../components/product/ProductCard";

const ResultPage = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid>
      <Row className="my-3 my-lg-5 px-lg-5" style={{ width: "100%" }}>
        <Col>
          <div className="px-3 fs-2">Results:</div>
        </Col>
      </Row>
      <Row
        className="px-xl-5 mx-0 my-5"
        style={{ width: "100%", rowGap: "3rem" }}
      >
        {searchResults.map((product) => (
          <Col
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={2}
            key={product.id}
            className="d-flex justify-content-center px-1"
          >
            <ProductCard item={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResultPage;
