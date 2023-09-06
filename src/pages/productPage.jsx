import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { getProductById, getProductsByCategory } from "../services/api";
import { useMediaQuery } from "react-responsive";
import {
  CustomBreadcrumb,
  CheckoutDetails,
  ProductCard,
  ProductCardX,
} from "../components";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

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
    // You can display a loading state here while the product data is being fetched
    return <div>Loading...</div>;
  }

  const BreadcrumbSection = () => {
    return (
      <Row
        className="px-md-3 px-xl-5 mx-0 mt-3"
        style={{ width: "100%", boxShadow: "border-box" }}
      >
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
              <Badge
                bg="success"
                className="fs-2 fw-bold mb-3"
                style={{ width: "fit-content" }}
              >
                ${product.price}
              </Badge>
            </a>

            <div className="fs-5">
              Stock: <span className="fw-semibold">20</span>
            </div>
          </Col>
        </Row>
        <Row
          className="px-lg-1 px-xl-3 mx-0 my-3 d-flex justify-content-center align-items-center"
          style={{
            width: "100%",
            boxShadow: "border-box",
          }}
        >
          <Col md={12} lg={5}>
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
            lg={5}
            id="checkout-options"
            className="mt-5 mt-lg-0 mx-lg-4"
          >
            <div className="mb-5">
              <div className="py-2 fw-bold">About this item:</div>
              <div>{product.description}</div>
            </div>
            <CheckoutDetails product={product} />
          </Col>
        </Row>
      </>
    );
  };

  const SeeAlsoSection = () => {
    const commonStyle = {
      boxSizing: "border-box",
      gap: "1rem",
    };

    const desktopStyle = {
      ...commonStyle,
      gridTemplateColumns: "repeat(6, 1fr)",
    };

    const tabletStyle = {
      ...commonStyle,
      gridTemplateColumns: "repeat(2, 1fr)",
    };

    return (
      <Row
        className="px-lg-1 px-xl-3 mx-0 my-5"
        style={{ width: "100%", boxShadow: "border-box" }}
      >
        <Col sm={12} xl={{ span: 10, offset: 1 }}>
          <h2 className="fs-4 mb-3">See Also</h2>
          <div
            className="d-grid"
            style={
              isMobile ? commonStyle : isTablet ? tabletStyle : desktopStyle
            }
          >
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
