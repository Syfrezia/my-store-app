import { CheckoutItem } from "..";

const CheckoutList = ({ cart }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "fit-content",
        maxHeight: "22.5rem",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
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
