import { CloseButton } from "react-bootstrap";
import { useCart } from "../../contexts/CartProvider";

const CheckoutItem = ({ item }) => {
  const { title, image, price, quantity, id } = item;

  const { removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(id); // Pass the product's id to removeFromCart
  };

  return (
    <div
      className="py-2 px-2 mb-2 bg-white d-grid"
      style={{
        gap: "1rem",
        gridTemplateColumns: "1fr 3fr",
        border: "1px solid #9e9e9e",
        borderRadius: "10px",
        minHeight: "5rem",
        height: "fit-content",
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <img src={image} alt={title} width={70} />
      </div>
      <div className="d-grid" style={{ gridTemplateColumns: "3fr 1fr" }}>
        <div className="d-grid" style={{ gridTemplateRows: "1fr 1fr" }}>
          <div className="fw-semibold custom-overflow">{title}</div>
          <div className="d-flex align-items-end">Qty: {quantity}</div>
        </div>
        <div
          className="justify-content-end d-grid"
          style={{ gridTemplateRows: "1fr 1fr" }}
        >
          <div className="d-flex justify-content-end">
            <CloseButton onClick={handleRemoveFromCart} />
          </div>
          <div className="d-flex align-items-end fw-semibold">
            ${(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
