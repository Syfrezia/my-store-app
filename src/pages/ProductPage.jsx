import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import { getProductById, getProductsByCategory } from "../services/api";
import { useMediaQuery } from "react-responsive";
import {
  CustomBreadcrumb,
  CheckoutOptions,
  ProductCard,
  ProductCardX,
} from "../components";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const isMobile = useMediaQuery({ maxWidth: 576 });

  const isTablet = useMediaQuery({ maxWidth: 991 });

  useEffect(() => {
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  useEffect(() => {
    if (product) {
      getProductsByCategory(product.category)
        .then((data) =>
          setSimilarProducts(
            data.filter((item) => item.id.toString() !== productId)
          )
        )
        .catch((error) =>
          console.error("Error fetching similar products:", error)
        );
    }
  }, [product, productId]);

  if (!product) {
    return (
      <>
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            role="status"
            variant="success"
            style={{ scale: "200%" }}
          />
        </div>
        <div className="visually-hidden">Loading...</div>
      </>
    );
  }

  const BreadcrumbSection = () => {
    return (
      <Row className="px-md-3 px-xl-5 mx-0 mt-3 w-100">
        <Col>
          <CustomBreadcrumb productTitle={product.title} />
        </Col>
      </Row>
    );
  };

  const ProductSection = () => {
    return (
      <>
        <Row
          className="my-3"
          style={{
            width: "90%",
            margin: "0 auto",
            borderBottom: "1px solid #8e8e8e",
          }}
        >
          <Col lg={{ span: 7, offset: 1 }}>
            <div className="pb-3">
              <h1 className="fs-3">{product.title}</h1>

              <div className="fs-4">Category: {product.category}</div>
            </div>
          </Col>
          <Col
            lg={3}
            className="d-flex flex-column justify-content-between pb-3"
          >
            <a href="#checkout-options">
              <Badge bg="success" className="fs-2 fw-bold mb-3">
                ${product.price}
              </Badge>
            </a>

            <div className="fs-5">
              Stock: <span className="fw-semibold">20</span>
            </div>
          </Col>
        </Row>
        <Row
          className="w-100 px-lg-1 px-xl-3 mx-0 my-3 d-flex justify-content-center align-items-center"
          style={{
            boxShadow: "border-box",
          }}
        >
          <Col md={12} lg={4}>
            <div className="d-flex justify-content-center align-items-center p-2 rounded-3">
              <img
                src={product.image}
                alt={product.title}
                width={isMobile ? 250 : 400}
                height={isMobile ? 250 : 400}
                style={{ objectFit: "contain" }}
              />
            </div>
          </Col>
          <Col
            md={12}
            lg={6}
            id="checkout-options"
            className="mt-5 mt-lg-0 mx-lg-4"
          >
            <div className="mb-5">
              <div className="py-2 fw-bold">About this item:</div>
              <div
                className={`product-description ${
                  isExpanded ? "expanded" : "collapsed"
                }`}
              >
                {product.description}
              </div>
              {product.description.length > 81 && (
                <Button
                  variant="link"
                  onClick={toggleDescription}
                  className="text-decoration-none px-0"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
            <CheckoutOptions product={product} />
          </Col>
        </Row>
      </>
    );
  };

  const SeeAlsoSection = () => {
    const mobileStyle = {
      boxSizing: "border-box",
      gap: "1rem",
    };

    const desktopStyle = {
      ...mobileStyle,
      gridTemplateColumns: "repeat(6, 1fr)",
    };

    const tabletStyle = {
      ...mobileStyle,
      gridTemplateColumns: "repeat(2, 1fr)",
    };

    let seeAlsoStyles;
    if (isMobile) {
      seeAlsoStyles = mobileStyle;
    } else if (isTablet) {
      seeAlsoStyles = tabletStyle;
    } else {
      seeAlsoStyles = desktopStyle;
    }

    return (
      <Row
        className="px-lg-1 px-xl-3 mx-0 my-5 w-100"
        style={{ boxShadow: "border-box" }}
      >
        <Col sm={12} xl={{ span: 10, offset: 1 }}>
          <h2 className="fs-4 mb-3">See Also</h2>
          <div className="d-grid" style={seeAlsoStyles}>
            {similarProducts.map((similarProduct) =>
              isMobile ? (
                <ProductCardX key={similarProduct.id} item={similarProduct} />
              ) : isTablet ? (
                <ProductCardX key={similarProduct.id} item={similarProduct} />
              ) : (
                <ProductCard key={similarProduct.id} item={similarProduct} />
              )
            )}
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Container fluid>
      <BreadcrumbSection />
      <ProductSection />
      <SeeAlsoSection />
    </Container>
  );
};

export default ProductPage;
