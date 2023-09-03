import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 20));
  };

  const minusQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.valueAsNumber;

    if (!isNaN(numericValue)) {
      setQuantity(Math.min(Math.max(numericValue, 1), 20));
    } else {
      setQuantity("");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center my-2 p-2 rounded-3"
      style={{ border: "1px solid #9e9e9e", scrollSnapAlign: "start" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "10% 30% 60%",
          width: "95%",
          height: "5rem",
        }}
      >
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </span>
        <span className="d-flex align-items-center">
          <img
            src={product.image}
            alt={product.title}
            height={75}
            style={{
              objectFit: "contain",
              minWidth: "75px",
              maxWidth: "75px",
            }}
          />
        </span>
        <span className="d-flex flex-column justify-content-center">
          <div
            style={{
              width: "50vw",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </div>
          <div className="fw-semibold">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Button className="p-0" variant="Link">
          Move to wishlist
        </Button>
        <div
          className="d-flex justify-content-between"
          style={{ width: "10rem" }}
        >
          <Button className="p-0" variant="Link">
            <FaRegTrashAlt />
          </Button>
          <div
            className="d-flex align-items-center"
            style={{
              border: "1px solid #198754",
              width: "fit-content",
              height: "2rem",
              padding: "2px",
              borderRadius: "10px",
            }}
          >
            <button onClick={minusQuantity} className="minus-button">
              <FaMinus style={{ fontSize: "0.8rem", color: "#198754" }} />
            </button>
            <input
              type="number"
              min={1}
              max={20}
              value={quantity}
              onChange={handleInputChange}
              style={{ textAlign: "center", fontSize: "1rem" }}
            />
            <button onClick={addQuantity} className="plus-button">
              <FaPlus style={{ fontSize: "0.8rem", color: "#198754" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
