import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Card
      as={Link}
      to={`/product/${item.id}`}
      style={{
        width: "12rem",
        height: "17rem",
        boxShadow: "0px 0px 10px #ccc",
        textDecoration: "none",
      }}
    >
      <Card.Img
        variant="top"
        src={item.image}
        width={120}
        height={120}
        className="p-1"
        style={{ objectFit: "contain" }}
      />
      <Card.Body style={{ padding: "1rem 0.5rem" }}>
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
      <Card.Footer
        className="bg-success text-light fw-medium"
        style={{ fontSize: "0.8rem", textTransform: "capitalize" }}
      >
        {item.category}
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
