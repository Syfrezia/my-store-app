import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Search from "../components/search";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ searchTerm, handleSearch }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  const renderBrand = (
    <Navbar.Brand as={Link} to="/" className="fs-3 py-0 fw-semibold">
      <span style={{ color: "#004000" }}>Fake</span>
      <span className="text-light">Store</span>
    </Navbar.Brand>
  );

  const renderCategoriesButton = (
    <Button
      as={Link}
      to="/category/all"
      variant="link"
      className="text-light fw-semibold me-3 p-1 d-flex justify-content-center align-items-center"
      style={{ textDecoration: "none" }}
    >
      Categories
    </Button>
  );

  const renderCartButton = (
    <Button
      variant="link"
      className="text-light fw-semibold p-1 d-flex justify-content-center align-items-center"
      style={{ textDecoration: "none" }}
    >
      Cart
      <FaShoppingCart className="ms-2" />
    </Button>
  );

  const renderDesktopHeader = (
    <Container
      fluid
      className="px-lg-5 py-lg-2 m-0"
      style={{ boxSizing: "border-box" }}
    >
      <Row className=" px-3 py-0 m-0" style={{ width: "100%" }}>
        <Col md={3}>{renderBrand}</Col>
        <Col md={6} className="d-flex">
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          {renderCategoriesButton}
          {renderCartButton}
        </Col>
      </Row>
    </Container>
  );

  const renderMobileHeader = (
    <Container
      fluid
      className="px-lg-5 px-xs-0 m-0"
      style={{ boxSizing: "border-box", rowGap: "1rem" }}
    >
      <Row className="p-0 m-0" style={{ width: "100%" }}>
        <Col xs={4} sm={4} md={4}>
          {renderBrand}
        </Col>
        <Col xs={8} sm={8} md={8} className="d-flex justify-content-end px-0">
          {renderCategoriesButton}
          {renderCartButton}
        </Col>
      </Row>
      <Row className="p-0 m-0" style={{ width: "100%" }}>
        <Col className="d-flex justify-content-between px-0">
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        </Col>
      </Row>
    </Container>
  );

  const header = isMobile ? renderMobileHeader : renderDesktopHeader;

  return (
    <Navbar expand="lg" className="bg-success navbar-success" sticky="top">
      {header}
    </Navbar>
  );
};

export default Header;
