import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getProductById, getProductsByCategory } from "../services/api";
import { useMediaQuery } from "react-responsive";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import CheckoutDetails from "../components/CheckoutDetails";
import ProductCard from "../components/ProductCard";
import ProductCardX from "../components/ProductCardX";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      <Row
        className="px-lg-1 px-xl-3 mx-0 my-5"
        style={{ width: "100%", boxShadow: "border-box" }}
      >
        <Col md={12} lg={{ span: 3, offset: 1 }}>
          <div className="d-flex justify-content-center align-items-center p-2 rounded-3">
            <img
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </div>
        </Col>
        <Col md={12} lg={4} className="mt-5 mt-lg-0 mx-lg-4">
          <div className="pb-3" style={{ borderBottom: "1px solid #8e8e8e" }}>
            <h1 className="fs-5">{product.title}</h1>
            <div className="fs-2 fw-bold">${product.price}</div>
            <div>Category: {product.category}</div>
          </div>
          <div>
            <div className="py-2 fw-bold">About this item:</div>
            <div>{product.description}</div>
          </div>
        </Col>
        <Col md={12} lg={3} className="mt-5 mt-lg-0">
          <CheckoutDetails product={product} />
        </Col>
      </Row>
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
