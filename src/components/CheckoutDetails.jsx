import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsChatLeftText, BsHeart, BsShare } from "react-icons/bs";
import { useCart } from "../contexts/CartProvider";
import FloatingAlert from "./FloatingAlert";

const CheckoutDetails = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);

  const { addToCart } = useCart(); // Access the cart context

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // 2000 milliseconds (2 seconds)
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

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
    <section
      style={{
        border: "2px solid #198754",
        borderRadius: "0.5rem",
        padding: "1rem",
        position: "relative",
      }}
    >
      {showAlert && (
        <FloatingAlert message="Product added to cart!" onClose={closeAlert} />
      )}
      <div className="fs-5 fw-semibold mb-3">Checkout Options</div>
      <div className="mb-3" style={{ display: "grid", rowGap: "0.5rem" }}>
        <Button
          onClick={handleAddToCart}
          variant="success"
          className="fw-semibold"
          sticky="bottom"
        >
          Add to Cart
        </Button>
        <Button variant="outline-success" className="fw-semibold">
          Buy Now
        </Button>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ fontSize: "0.8rem" }}
      >
        {footerButtons.map((button) => (
          <button
            className={button.class}
            style={button.style}
            key={button.spanText}
          >
            <span>{button.element}</span>
            <span className={button.spanClass}>{button.spanText}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CheckoutDetails;
