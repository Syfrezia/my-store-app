import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  OrderReview,
  CheckoutEmptyList,
  CheckoutList,
  ShippingForm,
  DeliveryOption,
  GiftCodeButton,
  BackButton,
} from "../components";
import { useCart } from "../contexts/CartProvider";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const CheckoutPage = () => {
  const [selectedDelivery, setSelectedDelivery] = useState("regular");

  const handleDelOptChange = (event) => {
    setSelectedDelivery(event.target.value);
  };

  const calculateDeliveryFee = () => {
    if (selectedDelivery === "regular") {
      return 0;
    } else if (selectedDelivery === "express") {
      return 10;
    } else if (selectedDelivery === "sameday") {
      return 25;
    } else {
      return null;
    }
  };

  const { calculateTotalQuantityChecked, cart } = useCart();
  const totalQuantity = calculateTotalQuantityChecked();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((product) => {
      if (product.checked) {
        totalPrice += product.quantity * product.price;
      }
    });
    return totalPrice.toFixed(2);
  };

  const orderPrice = calculateTotalPrice();
  const deliveryFee = calculateDeliveryFee();
  const appServiceFee = 1;

  const calculateFinalOrder = () => {
    const numericOrderPrice = parseFloat(orderPrice);
    const numericDeliveryFee = parseFloat(deliveryFee);
    const numericAppServiceFee = parseFloat(appServiceFee);

    if (
      isNaN(numericOrderPrice) ||
      isNaN(numericDeliveryFee) ||
      isNaN(numericAppServiceFee)
    ) {
      return 0;
    }

    return numericOrderPrice + numericDeliveryFee + numericAppServiceFee;
  };

  const finalFee = calculateFinalOrder().toFixed(2);

  const isDesktop = useMediaQuery({ minWidth: 992 });

  const orderSummary = (
    <>
      <div className="fs-4 px-0 mb-3 fw-semibold text-uppercase">
        Order Summary
      </div>
      <div className="d-grid px-0" style={{ rowGap: "0.2rem" }}>
        <div className="d-grid" style={{ gridTemplateColumns: "3fr 1fr" }}>
          <div>
            Total Price ({totalQuantity}{" "}
            {totalQuantity === 1 ? "item" : "items"})
          </div>
          <div className="d-flex justify-content-end">${orderPrice}</div>
        </div>
        <div className="d-grid" style={{ gridTemplateColumns: "3fr 1fr" }}>
          <div>Delivery Fee</div>
          <div className="d-flex justify-content-end">${deliveryFee}</div>
        </div>
        <div className="d-grid" style={{ gridTemplateColumns: "3fr 1fr" }}>
          <div>App Service Fee</div>
          <div className="d-flex justify-content-end">${appServiceFee}</div>
        </div>
      </div>
    </>
  );

  const orderTotal = (
    <>
      <Row className="py-2 m-0 w-100 bg-white">
        <div className="p-lg-0" style={{ fontSize: "0.7rem" }}>
          By completing this order, I agree to the{" "}
          <span className="text-success fw-semibold">terms and service</span>.
        </div>
      </Row>
      <Row className="pb-3 m-0 mb-2 w-100 bg-white">
        <Col className="p-lg-0">
          <div className="fw-medium">Order Total</div>
          <div className="fw-semibold fs-3">${finalFee}</div>
        </Col>
        <Col className="p-lg-0 d-flex align-items-center justify-content-end">
          <Button
            as={Link}
            to="/payment"
            variant="success"
            className="fw-semibold py-2"
          >
            Select Payment
          </Button>
        </Col>
      </Row>
    </>
  );

  const mobileCheckout = (
    <Container fluid className="p-0 bg-secondary-subtle">
      <Row className="w-100 bg-light p-o m-0">
        <Col className="p-0 m-0">
          <BackButton />
        </Col>
      </Row>
      <Row className="py-2 px-1 m-0 w-100 bg-white">
        <Col>
          <OrderReview totalQuantity={totalQuantity} />
        </Col>
      </Row>

      <Row className="py-2 m-0 mb-2 w-100 bg-white">
        <Col>
          {cart.length === 0 ? (
            <CheckoutEmptyList />
          ) : (
            <CheckoutList cart={cart} />
          )}
        </Col>
      </Row>

      <Row className="bg-success text-light py-3 m-0 mb-2 w-100">
        <Col lg={6}>
          <ShippingForm />
        </Col>
      </Row>

      <Row className="py-3 m-0 mb-2 w-100 bg-white">
        <Col>
          <DeliveryOption
            selectedDelivery={selectedDelivery}
            handleDelOptChange={handleDelOptChange}
          />
        </Col>
      </Row>

      <Row className="py-3 m-0 mb-2 w-100 bg-white">
        <Col>
          <GiftCodeButton />
        </Col>
      </Row>

      <Row className="py-2 m-0 mb-2 w-100 bg-white">
        <Col>{orderSummary}</Col>
      </Row>

      {orderTotal}
    </Container>
  );

  const desktopCheckout = (
    <>
      <Row className="w-100 bg-white p-o m-0">
        <Col className="p-0 m-0">
          <BackButton />
        </Col>
      </Row>
      <Container fluid className="py-0 px-5 m-0 bg-white">
        <Row className="w-100 m-0 p-0">
          <Col lg={{ span: 4, offset: 1 }} className="px-0 py-3 bg-white">
            <div className="mb-3">
              <OrderReview totalQuantity={totalQuantity} />
            </div>
            <div className="mb-3 pe-4">
              {cart.length === 0 ? (
                <CheckoutEmptyList isDesktop={isDesktop} />
              ) : (
                <CheckoutList isDesktop={isDesktop} cart={cart} />
              )}
            </div>
            <div className="w-100 mb-3">{orderSummary}</div>
            {orderTotal}
          </Col>
          <Col lg={{ span: 5, offset: 1 }} className="px-3 py-3 bg-white">
            <div className="mb-3 py-3 rounded-3 bg-success text-light">
              <ShippingForm />
            </div>
            <div className="w-100 mb-3">
              <DeliveryOption
                selectedDelivery={selectedDelivery}
                handleDelOptChange={handleDelOptChange}
              />
            </div>
            <div className="mb-3">
              <GiftCodeButton />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );

  return isDesktop ? desktopCheckout : mobileCheckout;
};

export default CheckoutPage;
