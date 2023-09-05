import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getProductsByIds } from "../../services/api";
import CartItem from "./CartItem";

const Cart = ({ isCartOpen }) => {
  const [cartHeight, setCartHeight] = useState("15.5rem");
  const [productData, setProductData] = useState([]); // State to store product data
  const [isInvalidQuantity, setIsInvalidQuantity] = useState(false);

  useEffect(() => {
    const productIds = [9, 10, 11, 12, 13, 14];
    getProductsByIds(productIds)
      .then((products) => {
        // Initialize productData with initial quantity and checked status
        const initialProductData = products.map((product) => ({
          ...product,
          quantity: 1, // Initial quantity
          checked: false, // Initial checked status
        }));
        setProductData(initialProductData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCartHeight = () => {
    setCartHeight((prevHeight) =>
      prevHeight === "15.5rem" ? "100vh" : "15.5rem"
    );
  };

  // Handle checkbox change and update the checked items state
  const handleCheckboxChange = (productId) => {
    setProductData((prevProductData) =>
      prevProductData.map((product) =>
        product.id === productId
          ? { ...product, checked: !product.checked }
          : product
      )
    );
  };

  // Calculate total quantity of checked items
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    productData.forEach((product) => {
      if (product.checked === true) {
        totalQuantity += product.quantity;
      }
    });
    return totalQuantity;
  };

  // Update quantity in productData
  const updateQuantity = (productId, newQuantity) => {
    setProductData((prevProductData) =>
      prevProductData.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  // Calculate total price based on quantity and price of each product
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productData.forEach((product) => {
      if (product.checked) {
        totalPrice += product.quantity * product.price;
      }
    });
    return totalPrice.toFixed(2);
  };

  const cartStyles = {
    position: "fixed",
    bottom: "0",
    zIndex: 11,
    width: "100vw",
    height: cartHeight,
    backgroundColor: "#fefefe",
    borderRadius: "1rem 1rem 0 0",
    transition: "height 0.3s ease-in-out",
  };

  const CartFooter = () => {
    const totalQuantity = calculateTotalQuantity(); // Calculate total quantity
    const totalPrice = calculateTotalPrice(); // Calculate total price

    return (
      <Row className="mb-2" style={{ height: "5rem", width: "100%" }}>
        <Col xs={6} className="d-flex justify-content-start align-items-center">
          <div
            className="d-grid"
            style={{ gridTemplateRows: "1fr 2fr", flexGrow: "1" }}
          >
            <div style={{ fontSize: "1rem" }}>Total Price</div>
            <div className="d-flex align-items-center fw-semibold fs-5">
              $ {totalPrice}
            </div>
          </div>
        </Col>
        <Col
          xs={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Button
            variant="success"
            disabled={isInvalidQuantity}
            className="m-0"
            style={{ height: "3rem", flex: "1" }}
          >
            Buy ({totalQuantity})
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {isCartOpen && (
        <Container
          fluid
          className="d-flex justify-content-center px-2 bg-light"
          style={cartStyles}
        >
          <Row
            onMouseDown={handleCartHeight}
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
            className="px-0 py-2 rounded-3"
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
                {productData.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={product.quantity}
                    setIsInvalidQuantity={setIsInvalidQuantity}
                    onCheckboxChange={handleCheckboxChange}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <CartFooter />
        </Container>
      )}
    </>
  );
};

export default Cart;
