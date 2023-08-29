import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsChatLeftText, BsHeart, BsShare } from "react-icons/bs";

const CheckoutDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityAddition = () => {
    setQuantity((quantity) => Math.min(quantity + 1, 20));
  };

  const handleQuantitySubstraction = () => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.valueAsNumber;

    if (!isNaN(numericValue)) {
      setQuantity(Math.min(Math.max(numericValue, 1), 20));
    } else {
      setQuantity("1");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #198754",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <div className="fs-5 fw-semibold mb-3">Checkout Details</div>
      <div
        style={{
          border: "1px solid #198754",
          width: "fit-content",
          padding: "2px",
          borderRadius: "10px",
        }}
      >
        <button onClick={handleQuantitySubstraction} className="minus-button">
          <FaMinus style={{ fontSize: "0.7rem", color: "#198754" }} />
        </button>
        <input
          type="number"
          min={1}
          max={20}
          value={quantity}
          onChange={handleInputChange}
          style={{ textAlign: "center" }}
        />
        <button onClick={handleQuantityAddition} className="plus-button">
          <FaPlus style={{ fontSize: "0.7rem", color: "#198754" }} />
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
        <span className="fs-5 fw-bold">
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>
      <div className="mb-3" style={{ display: "grid", rowGap: "0.5rem" }}>
        <Button variant="success">
          Add to Cart
        </Button>
        <Button variant="outline-success">
          Buy Now
        </Button>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ fontSize: "0.8rem" }}
      >
        <button className="clear-button me-1">
          <span>
            <BsChatLeftText />
          </span>
          <span className="ms-2 fw-semibold">Chat</span>
        </button>
        <button
          className="clear-button px-2"
          style={{
            borderLeft: "2px solid #e1e1e1",
            borderRight: "2px solid #e1e1e1",
          }}
        >
          <span>
            <BsHeart />
          </span>
          <span className="ms-2 fw-semibold">Wishlist</span>
        </button>
        <button className="clear-button ms-1">
          <span>
            <BsShare />
          </span>
          <span className="ms-2 fw-semibold">Share</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
