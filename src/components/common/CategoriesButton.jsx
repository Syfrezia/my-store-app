import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const CategoriesButton = () => {
  return (
    <Button
      as={Link}
      to="/category/all"
      variant="link"
      className="text-light fw-semibold me-lg-2 p-1 d-flex justify-content-center align-items-center text-decoration-none"
    >
      <BiCategory className="fs-3" />
    </Button>
  );
};

export default CategoriesButton;
