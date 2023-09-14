const OrderReview = ({ totalQuantity }) => {
  return (
    <div className="fs-4 px-0 fw-semibold text-uppercase">
      Review Your Order{" "}
      <span className="fw-normal text-secondary text-capitalize">
        ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
      </span>
    </div>
  );
};

export default OrderReview;
