import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import electronics from "../assets/images/electronics.jpg";
import jewelery from "../assets/images/jewelery.jpg";
import menClothing from "../assets/images/men's clothing.jpg";
import womenClothing from "../assets/images/women's clothing.jpg";

const categories = [
  { title: "Men's Fashion", image: menClothing, path: "mens-clothing" },
  { title: "Women's Fashion", image: womenClothing, path: "womens-clothing" },
  { title: "Electronics", image: electronics, path: "electronics" },
  { title: "Jewelery", image: jewelery, path: "jewelery" },
];

const Recommendation = () => {
  const generateCard = (category) => (
    <Col md={6} lg={3} key={category.title}>
      <Card
        as={Link}
        to={`/category/${category.path}`}
        className="mb-4"
        style={{
          boxShadow: "0px 0px 10px #ccc",
          textDecoration: "none",
        }}
      >
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title className="fw-semibold">{category.title}</Card.Title>
          <Card.Img
            src={category.image}
            alt={category.title}
            style={{
              maxWidth: "20rem",
              height: "25rem",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <>
      <Container
        fluid
        className="fw-semibold fs-3 my-3 d-flex justify-content-center"
      >
        <h2>Catalogue</h2>
      </Container>
      <Container className="d-flex justify-content-between">
        <Row>{categories.map((category) => generateCard(category))}</Row>
      </Container>
    </>
  );
};

export default Recommendation;
