import { CheckoutItem } from "..";

const CheckoutList = ({ cart }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        maxWidth: "100%",
        minWidth: "15rem",
      }}
    >
      {cart
        .filter((product) => product.checked)
        .map((product) => (
          <CheckoutItem key={product.id} item={product} />
        ))}
    </div>
  );
};

export default CheckoutList;
