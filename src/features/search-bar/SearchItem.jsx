import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchItem = ({ handleSearchItemClick, product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="text-dark fw-regular d-grid text-decoration-none"
      style={{ gridTemplateColumns: "1fr 9fr" }}
      onClick={handleSearchItemClick}
    >
      <div className="d-flex align-items-center justify-content-center">
        <FaSearch />
      </div>
      <div>{product.title}</div>
    </Link>
  );
};

export default SearchItem;
