import { useState, useEffect } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Spinner,
  Placeholder,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getProductsByIds } from "../../services/api";

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

  const placeholderCarousel = (
    <Carousel.Item
      style={{
        height: isMobile ? "32rem" : "22rem",
      }}
    >
      <Row className="w-100 h-100 m-0 p-0">
        <Col
          xs={12}
          lg={4}
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <Spinner variant="success" style={{ scale: "200%" }} />
        </Col>

        <Col
          xs={12}
          lg={8}
          className="d-flex flex-column justify-content-center"
        >
          <Placeholder
            as="p"
            animation="glow"
            style={{
              width: "100%",
            }}
          >
            <Placeholder xs={12} bg="success" size="lg" />
          </Placeholder>

          {!isMobile && (
            <Placeholder
              as="p"
              animation="glow"
              className="d-grid mt-3"
              style={{
                width: "100%",
                gridTemplateRows: "repeat(3, 1fr)",
                rowGap: "0.5rem",
              }}
            >
              <Placeholder xs={10} bg="success" size="sm" />
              <Placeholder xs={9} bg="success" size="sm" />
              <Placeholder xs={11} bg="success" size="sm" />
              <Placeholder xs={8} bg="success" size="sm" />
            </Placeholder>
          )}
        </Col>
      </Row>
    </Carousel.Item>
  );

  const fetchedCarousel = products.map((product) => (
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
      <Row>
        <Col
          xs={12}
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
          xs={12}
          lg={8}
          className="d-flex justify-content-center align-items-center text-dark"
        >
          <div className="rounded p-3">
            <h3 className="d-flex align-items-center">{product.title}</h3>
            {!isMobile && <p>{product.description}</p>}
          </div>
        </Col>
      </Row>
    </Carousel.Item>
  ));

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
            {products.length === 0 ? placeholderCarousel : fetchedCarousel}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselSection;
