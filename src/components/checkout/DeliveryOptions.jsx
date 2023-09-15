import { Form } from "react-bootstrap";

const DeliveryOptions = ({ selectedDelivery, handleDelOptChange }) => {
  const deliveryDetails = [
    {
      price: "Free",
      type: "Regular",
      duration: "(3-7 business days)",
      id: "del-opt-regular",
      value: "regular",
    },
    {
      price: "$10",
      type: "Express",
      duration: "(1-2 business days)",
      id: "del-opt-express",
      value: "express",
    },
    {
      price: "$25",
      type: "Same-Day",
      duration: "(24 hours guaranteed)",
      id: "del-opt-sameday",
      value: "sameday",
    },
  ];

  return (
    <>
      <div className="mb-3 px-0 fs-4 text-uppercase fw-semibold">
        Select Delivery
      </div>
      <div className="d-grid px-0" style={{ rowGap: "0.5rem" }}>
        {deliveryDetails.map((detail) => (
          <label
            key={detail.id}
            htmlFor={detail.id}
            className="bg-success-subtle border border-1 rounded-2 d-grid"
            style={{
              height: "4rem",
              gridTemplateColumns: "2fr 6fr 2fr",
              cursor: "pointer",
            }}
          >
            <div className="fw-medium fs-5 d-flex align-items-center justify-content-center">
              {detail.price}
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <div>{detail.type}</div>
              <div className="text-secondary" style={{ fontSize: "0.8rem" }}>
                {detail.duration}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Form.Check
                type="radio"
                id={detail.id}
                name="delivery-option"
                value={detail.value}
                checked={selectedDelivery === detail.value}
                onChange={handleDelOptChange}
              />
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default DeliveryOptions;
