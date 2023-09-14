import { Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ toggleCart, calculateTotalQuantity }) => {
  return (
    <Button
      onClick={toggleCart}
      variant="link"
      className="text-light fw-semibold p-1 d-flex justify-content-center align-items-center text-decoration-none position-relative"
      style={{
        width: "3rem",
        height: "2.5rem",
      }}
    >
      <FaShoppingCart className="fs-3" />
      {calculateTotalQuantity() > 0 && (
        <Badge bg="danger" className="rounded-3 position-absolute top-0 end-0">
          {calculateTotalQuantity()}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
