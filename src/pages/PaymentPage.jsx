import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useCheckout } from "../contexts/CheckoutProvider";
import { paypal, applePay, googlePay } from "../assets/images";
import { BackButton } from "../components";

const PaymentPage = () => {
  const { finalFee } = useCheckout();
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const [withPromo, setWithPromo] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleDelOptChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePromoChange = (event) => {
    if (event.target.value === "10") {
      setWithPromo(true);
    } else {
      setWithPromo(false);
    }
  };

  const finalFeeWithPromo = (finalFee * 0.9).toFixed(2);

  const payOptions = [
    { id: "pay-paypal", image: paypal, name: "PayPal", value: "paypal" },
    {
      id: "pay-applepay",
      image: applePay,
      name: "Apple Pay",
      value: "applepay",
    },
    {
      id: "pay-googlepay",
      image: googlePay,
      name: "Google Pay",
      value: "googlepay",
    },
  ];

  return (
    <Container fluid className="py-2 px-0">
      <Row className="w-100 bg-white p-o m-0">
        <Col className="p-0 m-0">
          <BackButton />
        </Col>
      </Row>
      <Row className="w-100 m-0">
        <Col xs={12} md={{ span: 4, offset: 2 }} className="p-2">
          <div className="px-2 fs-3 fw-semibold">Select Payment Method</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{ span: 4, offset: 2 }} className="p-2">
          <div className="d-flex flex-column align-items-center px-2">
            {payOptions.map((option) => (
              <label
                htmlFor={option.id}
                className="border border-success border-2 rounded-3 d-grid mb-2 bg-success-subtle"
                style={{
                  height: "4rem",
                  width: "95%",
                  gridTemplateColumns: "3fr 3fr 1fr",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <img src={option.image} alt={option.name} height={25} />
                </div>
                <div className="fs-5 fw-medium d-flex align-items-center justify-content-start">
                  {option.name}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Form.Check
                    type="radio"
                    name="payment-options"
                    id={option.id}
                    value={option.value}
                    checked={selectedPayment === option.value}
                    onChange={handleDelOptChange}
                  />
                </div>
              </label>
            ))}
          </div>
          <div className="px-3 fw-medium mb-1">
            Use our "First Purchase" promo to get up to 10% discount!
          </div>
          <div className="px-3">
            <Form.Select size="lg" onChange={handlePromoChange}>
              <option className="fs-6">-- Select Promo --</option>
              <option value="10" className="bg-success text-light fs-6">
                First Purchase (10% off)
              </option>
            </Form.Select>
          </div>
        </Col>

        <Col xs={12} md={4} className="py-2 px-3">
          <div className="fs-4 mb-2 px-2">Payment Summary</div>
          <div className="w-100 px-2" style={{ height: "fit-content" }}>
            <div
              className="d-grid fw-medium"
              style={{ gridTemplateColumns: "8fr 2fr" }}
            >
              <span>Subtotal</span>
              <span>${finalFee}</span>
            </div>
            <div className="d-grid" style={{ gridTemplateColumns: "8fr 2fr" }}>
              <span>Promo</span>
              {withPromo ? <span>-10%</span> : <span>-</span>}
            </div>
            <div
              className="d-grid border-top border-dark border-2 my-2"
              style={{ gridTemplateColumns: "8fr 2fr" }}
            >
              <span className="fs-5 fw-semibold">Order Total</span>
              {withPromo ? (
                <span className="fs-5 fw-semibold">${finalFeeWithPromo}</span>
              ) : (
                <span className="fs-5 fw-semibold">${finalFee}</span>
              )}
            </div>
          </div>

          <div className="d-flex align-items-center mb-1 px-2">
            <Form.Check
              type="checkbox"
              id="tnc-agreement"
              className="me-2"
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />

            <label htmlFor="tnc-agreement" style={{ fontSize: "0.7rem" }}>
              <span>I agree to the </span>
              <span className="text-success fw-semibold">
                Terms & Conditions{" "}
              </span>
              <span>and </span>
              <span className="text-success fw-semibold">Privacy Policy </span>
            </label>
          </div>

          <div className="px-2 d-flex justify-content-center align-items-center">
            <Button
              variant="success"
              style={{ flex: "1" }}
              disabled={!isCheckboxChecked}
            >
              Pay $
              {withPromo ? (
                <span>{finalFeeWithPromo}</span>
              ) : (
                <span>{finalFee}</span>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
