import { useState, useEffect } from "react";
import { Container, Row, Col, ToggleButton } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const categories = [
  { title: "All", path: "all", name: "" },
  { title: "Electronics", path: "electronics", name: "electronics" },
  { title: "Jewelery", path: "jewelery", name: "jewelery" },
  { title: "Men's Clothing", path: "mens-clothing", name: "men's clothing" },
  {
    title: "Women's Clothing",
    path: "womens-clothing",
    name: "women's clothing",
  },
];

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const location = useLocation();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    const pathParam = location.pathname.replace("/category/", "");
    const matchedCategory = categories.find(
      (category) => category.path === pathParam
    );
    if (matchedCategory) {
      setSelectedCategory(matchedCategory.name);
    }
  }, [location]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const displayCategory =
    categories.find((category) => category.name === selectedCategory)?.title ||
    "All";

  const isMobile = useMediaQuery({ maxWidth: 991 });

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const CategoryTitleSection = () => {
    return (
      <Row>
        <Col sm={12}>
          <div
            className="d-flex justify-content-center fs-3 fw-bold mt-5"
            style={{ textTransform: "capitalize" }}
          >
            {displayCategory}
          </div>
        </Col>
      </Row>
    );
  };

  const CategoryFilterSection = () => {
    return (
      <Row>
        <Col sm={12} className="d-flex justify-content-center mt-3">
          <div
            className="category-buttons"
            style={
              isMobile
                ? {
                    width: "20rem",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }
                : { display: "flex", gap: "1rem" }
            }
          >
            {categories.map((category) => (
              <ToggleButton
                key={category.name}
                type="radio"
                variant="light"
                name={category.name}
                value={category.name}
                checked={selectedCategory === category.name}
                className="mx-1 my-1"
                style={{
                  border: "2px solid #198754",
                  textTransform: "capitalize",
                }}
              >
                <Link
                  to={`/category/${category.path}`}
                  onClick={() => handleCategoryFilter(category.name)}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {category.title}
                </Link>
              </ToggleButton>
            ))}
          </div>
        </Col>
      </Row>
    );
  };

  const ProductCardSection = () => {
    return (
      <Row
        className="px-xl-5 mx-0 my-5"
        style={{ width: "100%", rowGap: "3rem", boxShadow: "border-box" }}
      >
        {filteredProducts.map((product) => (
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
    );
  };

  return (
    <Container fluid>
      <CategoryTitleSection />
      <CategoryFilterSection />
      <ProductCardSection />
    </Container>
  );
};

export default CategoryPage;
