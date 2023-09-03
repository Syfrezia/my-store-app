import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getProductsByIds } from "../services/api";
import CartItem from "../components/CartItem";
import FilterOverlay from "../components/filterOverlay";

const Cart = ({ isFilterOpen, handleFilter }) => {
  const [cartHeight, setCartHeight] = useState("15.5rem");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productIds = [9, 10, 11, 12, 13, 14];
    getProductsByIds(productIds)
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCartHeight = () => {
    setCartHeight((prevHeight) => (prevHeight === "15.5rem" ? "100vh" : "15.5rem"));
  };

  const cartStyles = {
    position: "fixed",
    bottom: "0",
    zIndex: "3",
    width: "100vw",
    height: cartHeight,
    backgroundColor: "#fefefe",
    borderRadius: "1rem 1rem 0 0",
    transition: "height 0.3s ease-in-out",
  };

  const CartFooter = () => {
    return (
      <Row className="mb-3" style={{ height: "5rem", width: "100%" }}>
        <Col xs={6} className="d-flex justify-content-start align-items-center">
          <div
            className="d-grid"
            style={{ gridTemplateRows: "1fr 2fr", flexGrow: "1" }}
          >
            <div style={{ fontSize: "1rem" }}>Total Price</div>
            <div className="d-flex align-items-center fw-semibold fs-5">
              $ -
            </div>
          </div>
        </Col>
        <Col
          xs={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Button
            variant="success"
            className="m-0"
            style={{ height: "3rem", flex: "1" }}
          >
            Buy (0)
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {isFilterOpen && (
        <>
          <FilterOverlay handleFilter={handleFilter} />
          <Container
            fluid
            className="d-flex justify-content-center px-2 bg-light"
            style={cartStyles}
          >
            <Row
              onClick={handleCartHeight}
              className="d-flex justify-content-center mt-3"
              style={{ width: "100%", height: "1rem" }}
            >
              <div
                className="rounded-pill"
                style={{
                  backgroundColor: "#9f9f9f",
                  width: "10rem",
                  height: "0.3rem",
                  cursor: "pointer",
                }}
              ></div>
            </Row>
            <Row
              className="p-0 rounded-3"
              style={{
                transition: "height 0.3s ease-in-out",
                height: cartHeight === "15.5rem" ? "55%" : "77.5%",
                width: "100%",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                backgroundColor: "#fefefe",
              }}
            >
              <Col className="py-0 px-1">
                <div>
                  {products.map((product) => (
                    <CartItem key={product.id} product={product} />
                  ))}
                </div>
              </Col>
            </Row>
            <CartFooter />
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;
