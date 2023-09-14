import { emptyCart } from "../../assets/images";

const CheckoutEmptyList = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center fw-bold px-2"
      style={{
        border: "1px solid #9e9e9e",
        borderRadius: "10px",
        minHeight: "7rem",
        color: "#198754",
        maxWidth: "100%",
        minWidth: "15rem",
      }}
    >
      <img src={emptyCart} alt="empty cart" width={75} />
      <div>You have no order to checkout.</div>
    </div>
  );
};

export default CheckoutEmptyList;
