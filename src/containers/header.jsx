import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Cart from "./Cart";

const Header = ({ searchTerm, handleSearch, isFilterOpen, handleFilter }) => {
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
      onClick={handleFilter}
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
      <Row className="px-0 py-0 m-0" style={{ width: "100%" }}>
        <Col lg={3} className="px-0">
          {renderBrand}
        </Col>
        <Col lg={6} className="d-flex px-0">
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        </Col>
        <Col lg={3} className="d-flex justify-content-end px-0">
          {renderCategoriesButton}
          {renderCartButton}
        </Col>
      </Row>
    </Container>
  );

  const renderMobileHeader = (
    <>
      <Cart isFilterOpen={isFilterOpen} handleFilter={handleFilter} />
      <Container
        fluid
        className="px-xs-0 m-0"
        style={{ boxSizing: "border-box", rowGap: "1rem" }}
      >
        <Row className="p-0 m-0" style={{ width: "100%" }}>
          <Col xs={4} sm={4} md={{ span: 3, offset: 1 }}>
            {renderBrand}
          </Col>
          <Col xs={8} sm={8} md={7} className="d-flex justify-content-end px-0">
            {renderCategoriesButton}
            {renderCartButton}
          </Col>
        </Row>
        <Row className="p-0 m-0" style={{ width: "100%" }}>
          <Col
            md={{ span: 10, offset: 1 }}
            className="d-flex justify-content-between px-0"
          >
            <Search searchTerm={searchTerm} handleSearch={handleSearch} />
          </Col>
        </Row>
      </Container>
    </>
  );

  const header = isMobile ? renderMobileHeader : renderDesktopHeader;

  return (
    <Navbar expand="lg" className="bg-success navbar-success" sticky="top">
      {header}
    </Navbar>
  );
};

export default Header;
