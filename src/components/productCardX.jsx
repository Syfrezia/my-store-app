import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCardX = ({ item }) => {
  return (
    <Card
      as={Link}
      to={`/product/${item.id}`}
      className="rounded-4 d-flex flex-row px-2"
      style={{
        maxWidth: "25rem",
        boxShadow: "0px 0px 10px #ccc",
        textDecoration: "none",
      }}
    >
      <Card.Img
        variant="top"
        src={item.image}
        height={120}
        className="p-1"
        style={{ objectFit: "contain", minWidth: "140px", maxWidth: "140px" }}
      />
      <Card.Body style={{ padding: "1rem 1rem" }}>
        <Card.Title
          className="fw-normal"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "0.8rem",
          }}
        >
          {item.title}
        </Card.Title>
        <Card.Text className="fw-bold fs-5" style={{ fontSize: "1rem" }}>
          ${item.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCardX;
