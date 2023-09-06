import React, { useState } from "react";
import { Container, Row, Col, Button, CloseButton } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import CartItem from "./CartItem";
import { useCart } from "../../contexts/CartProvider";
import { emptyCart } from "../../assets/images";

const Cart = ({ isCartOpen, toggleCart }) => {
  const [cartHeight, setCartHeight] = useState("15.5rem");
  const [isInvalidQuantity, setIsInvalidQuantity] = useState(false);

  const { cart, calculateTotalQuantityChecked } = useCart();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  const handleCartHeight = () => {
    setCartHeight((prevHeight) =>
      prevHeight === "15.5rem" ? "100vh" : "15.5rem"
    );
  };

  // Calculate total price based on quantity and price of each product
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((product) => {
      if (product.checked) {
        totalPrice += product.quantity * product.price;
      }
    });
    return totalPrice.toFixed(2);
  };

  const cartStylesMobile = {
    position: "fixed",
    bottom: "0",
    zIndex: 11,
    width: "100vw",
    height: cartHeight,
    backgroundColor: "#fefefe",
    borderRadius: "1rem 1rem 0 0",
    transition: "height 0.3s ease-in-out",
  };

  const cartStylesDesktop = {
    position: "fixed",
    right: "0",
    top: "0",
    zIndex: 11,
    minWidth: "25vw",
    maxWidth: "40vw",
    height: "100vh",
    backgroundColor: "#fefefe",
    borderRadius: "1rem 0 0 1rem",
    boxSizing: "border-box",
  };

  const cartMain = (
    <Col className="py-0 px-1">
      {cart.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          quantity={product.quantity}
          setIsInvalidQuantity={setIsInvalidQuantity}
        />
      ))}
    </Col>
  );

  const emptyCartPlaceholder = (
    <Col className="d-flex flex-column justify-content-center align-items-center">
      <img src={emptyCart} alt="empty cart image" width={250} />
      <h4
        className="my-3"
        style={{
          textAlign: "center",
          color: "#198754",
        }}
      >
        Looks like your shopping cart is empty
      </h4>
      <Button
        onClick={toggleCart}
        variant="outline-success"
        className="fw-semibold"
      >
        Continue Browsing
      </Button>
    </Col>
  );

  const CartFooter = () => {
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
            disabled={
              calculateTotalQuantityChecked() === 0 || isInvalidQuantity
            }
            className="m-0"
            style={{ height: "3rem", flex: "1" }}
          >
            Buy ({calculateTotalQuantityChecked()})
          </Button>
        </Col>
      </Row>
    );
  };

  const cartMobile = (
    <Container
      fluid
      className={`${
        isCartOpen ? "slide-in-bottom" : ""
      } d-flex justify-content-center px-2 bg-light`}
      style={cartStylesMobile}
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
        {cart.length === 0 ? emptyCartPlaceholder : cartMain}
      </Row>
      <CartFooter />
    </Container>
  );

  const cartDesktop = (
    <Container
      fluid
      className={`${
        isCartOpen ? "slide-in-right" : ""
      } d-flex flex-column justify-content-center px-2 bg-light`}
      style={cartStylesDesktop}
    >
      <Row className="my-3" style={{ width: "95%" }}>
        <Col className="d-flex justify-content-between align-items-center">
          <span className="fs-4 fw-semibold">Your Shopping Cart:</span>
          <CloseButton onClick={toggleCart} />
        </Col>
      </Row>
      <Row
        className="px-0 py-2 rounded-3 mb-3"
        style={{
          height: "75%",
          width: "90%",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          backgroundColor: "#fefefe",
        }}
      >
        {cart.length === 0 ? emptyCartPlaceholder : cartMain}
      </Row>
      <CartFooter />
    </Container>
  );

  return isCartOpen ? (isDesktop ? cartDesktop : cartMobile) : null;
};

export default Cart;
