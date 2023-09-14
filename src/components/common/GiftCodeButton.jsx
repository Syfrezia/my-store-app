import { TbDiscount2 } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";

const GiftCodeButton = () => {
  return (
    <div
      className="border border-3 rounded-3 d-grid"
      style={{ height: "4rem", gridTemplateColumns: "1fr 3fr 1fr" }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <TbDiscount2 className="text-success" style={{ fontSize: "2.5rem" }} />
      </div>
      <div className="d-flex align-items-center justify-content-start fw-semibold fs-6">
        Use Gift Code
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <FaChevronRight
          className="text-secondary"
          style={{ fontSize: "1.5rem" }}
        />
      </div>
    </div>
  );
};

export default GiftCodeButton;
