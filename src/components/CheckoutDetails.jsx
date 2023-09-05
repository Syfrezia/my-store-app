import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsChatLeftText, BsHeart, BsShare } from "react-icons/bs";

const CheckoutDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity((quantity) => Math.min(quantity + 1, 20));
  };

  const minusQuantity = () => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.valueAsNumber;
    if (!isNaN(numericValue)) {
      setQuantity(Math.min(Math.max(numericValue, 1), 20));
    } else {
      setQuantity("");
    }
  };

  const isInvalidQuantity = isNaN(quantity) || quantity < 1 || quantity > 20;

  const footerButtons = [
    {
      class: "clear-button me-1",
      element: <BsChatLeftText />,
      style: {},
      spanText: "Chat",
      spanClass: "ms-2 fw-semibold",
    },
    {
      class: "clear-button px-2",
      element: <BsHeart />,
      style: {
        borderLeft: "2px solid #e1e1e1",
        borderRight: "2px solid #e1e1e1",
      },
      spanText: "Wishlist",
      spanClass: "ms-2 fw-semibold",
    },
    {
      class: "clear-button ms-1",
      element: <BsShare />,
      style: {},
      spanText: "Share",
      spanClass: "ms-2 fw-semibold",
    },
  ];

  return (
    <div
      style={{
        border: "2px solid #198754",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <div className="fs-5 fw-semibold mb-3">Checkout Details</div>
      <div
        className="d-flex align-items-center"
        style={{
          border: "2px solid #198754",
          width: "fit-content",
          height: "3rem",
          padding: "2px",
          borderRadius: "10px",
        }}
      >
        <button onClick={minusQuantity} className="minus-button">
          <FaMinus style={{ fontSize: "1rem", color: "#198754" }} />
        </button>
        <input
          type="number"
          min={1}
          max={20}
          value={quantity}
          onChange={handleInputChange}
          style={{ textAlign: "center", fontSize: "1.2rem" }}
        />
        <button onClick={addQuantity} className="plus-button">
          <FaPlus style={{ fontSize: "1rem", color: "#198754" }} />
        </button>
      </div>
      <div className="mb-2">
        <span>Stock: </span>
        <span className="fw-bold">20</span>
      </div>
      <div
        className="d-flex justify-content-between align-items-end mb-3"
        style={{ width: "100%" }}
      >
        <span style={{ fontSize: "1.1rem", color: "#8e8e8e" }}>Subtotal</span>
        <span className="fs-3 fw-bold">
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>
      <div className="mb-3" style={{ display: "grid", rowGap: "0.5rem" }}>
        <Button
          variant="success"
          className="fw-semibold"
          disabled={isInvalidQuantity}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline-success"
          className="fw-semibold"
          disabled={isInvalidQuantity}
        >
          Buy Now
        </Button>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ fontSize: "0.8rem" }}
      >
        {footerButtons.map((button) => (
          <button className={button.class} style={button.style} key={button.spanText}>
            <span>{button.element}</span>
            <span className={button.spanClass}>{button.spanText}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckoutDetails;
