import { useState, useEffect } from "react";
import { getProductsByIds } from "../services/api";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const CarouselSection = () => {
  const [products, setProducts] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 991 });

  useEffect(() => {
    const productIds = [9, 10, 11, 12, 13, 14];
    getProductsByIds(productIds)
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const carouselMobile = (
    <Container
      fluid
      data-bs-theme="dark"
      className="d-flex flex-column align-items-center px-2 py-3 bg-success text-light"
    >
      <Row style={{ width: "100%" }}>
        <Col className="d-flex justify-content-center">
          <h2>Featured</h2>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col
          sm={{ span: 10, offset: 1 }}
          className="bg-light p-0 border border-2 rounded-3"
        >
          <Carousel
            style={{
              padding: "1rem 1rem",
              mixBlendMode: "multiply",
            }}
          >
            {products.map((product) => (
              <Carousel.Item
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}
                style={{
                  height: "32rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Row>
                  <Col
                    sm={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      style={{ objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm={12}
                    className="d-flex justify-content-center align-items-center text-dark"
                  >
                    <div className="rounded p-3">
                      <h3 className="d-flex justify-content-center align-items-center">
                        {product.title}
                      </h3>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );

  const carouselDesktop = (
    <Container
      fluid
      data-bs-theme="dark"
      className="d-flex flex-column align-items-center px-5 pb-4 bg-success text-light"
    >
      <Row style={{ width: "100%" }}>
        <Col className="d-flex justify-content-center">
          <h2 className="fw-semibold mb-3">Featured</h2>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col lg={12} className="bg-light p-0 border border-2 rounded-3">
          <Carousel
            style={{
              padding: "1rem 6rem",
              mixBlendMode: "multiply",
            }}
          >
            {products.map((product) => (
              <Carousel.Item
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}
                style={{
                  height: "22rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Row>
                  <Col
                    lg={4}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      style={{ objectFit: "contain" }}
                    />
                  </Col>
                  <Col
                    lg={8}
                    className="d-flex flex-column justify-content-center align-items-start text-dark pe-5"
                  >
                    <div className="rounded p-3">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );

  return isMobile ? carouselMobile : carouselDesktop;
};

export default CarouselSection;
