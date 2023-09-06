import { useState, useEffect } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getProductsByIds } from "../services/api";

const CarouselSection = () => {
  const [products, setProducts] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 991 });

  useEffect(() => {
    const productIds = [9, 10, 11, 12, 13, 14];
    getProductsByIds(productIds)
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const commonContainerClass =
    "d-flex flex-column align-items-center bg-success text-light";

  return (
    <Container
      fluid
      data-bs-theme="dark"
      className={
        commonContainerClass + (isMobile ? " px-2 py-2" : " px-5 pb-4")
      }
    >
      <Row style={{ width: "100%" }}>
        <Col className="d-flex justify-content-center">
          <h2 className="fw-semibold mb-3">Featured</h2>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col
          md={{ span: 10, offset: 1 }}
          lg={{ span: 12, offset: 0 }}
          className="bg-light p-0 rounded-3"
        >
          <Carousel
            style={{
              padding: isMobile ? "1rem 1rem" : "1rem 6rem",
              mixBlendMode: "multiply",
            }}
          >
            {products.map((product) => (
              <Carousel.Item
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}
                style={{
                  height: isMobile ? "32rem" : "22rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {isMobile ? (
                  <>
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
                  </>
                ) : (
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
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselSection;
