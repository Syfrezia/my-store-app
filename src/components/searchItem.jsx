import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchItem = ({ handleSearchItemClick, product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="text-dark fw-semibold"
      style={{ textDecoration: "none" }}
      onClick={handleSearchItemClick}
    >
      <FaSearch className="me-2" />
      <span>{product.title}</span>
    </Link>
  );
};

export default SearchItem;
