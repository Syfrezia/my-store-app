import { useState } from "react";
import { Container, Row, Col, Navbar, Button, Badge } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../features/search-bar/Search";
import Cart from "../features/cart-component/Cart";
import FilterOverlay from "../components/FilterOverlay";

const Header = ({ searchTerm, handleSearch }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayZindex, setOverlayZindex] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    isCartOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true);
    overlayZindex === 1 ? setOverlayZindex(10) : setOverlayZindex(1);
    setIsCartOpen(!isCartOpen);
  };

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
      onClick={toggleCart}
      variant="link"
      className="text-light fw-semibold p-1 d-flex justify-content-center align-items-center"
      style={{
        textDecoration: "none",
        position: "relative",
        width: "3rem",
        height: "2.5rem",
      }}
    >
      <FaShoppingCart className="fs-3" />
      <Badge
        bg="danger"
        className="rounded-pill"
        style={{ scale: "0.8", position: "absolute", top: "0", right: "0" }}
      >
        0
      </Badge>
    </Button>
  );

  const renderDesktopHeader = (
    <>
      <Cart isCartOpen={isCartOpen} />
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
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              setIsOverlayOpen={setIsOverlayOpen}
            />
          </Col>
          <Col lg={3} className="d-flex justify-content-end px-0">
            {renderCategoriesButton}
            {renderCartButton}
          </Col>
        </Row>
      </Container>
    </>
  );

  const renderMobileHeader = (
    <>
      <Cart isCartOpen={isCartOpen} />

      <Container
        fluid
        className="px-xs-0 m-0"
        style={{ boxSizing: "border-box", rowGap: "1rem" }}
      >
        <Row
          className="p-0 m-0 d-flex align-items-center"
          style={{ width: "100%" }}
        >
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
            <Search
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              setIsOverlayOpen={setIsOverlayOpen}
            />
          </Col>
        </Row>
      </Container>
    </>
  );

  const header = isMobile ? renderMobileHeader : renderDesktopHeader;

  return (
    <>
      <Navbar expand="lg" className="bg-success navbar-success" sticky="top">
        {isOverlayOpen && (
          <FilterOverlay
            overlayZindex={overlayZindex}
            toggleCart={toggleCart}
          />
        )}
        {header}
      </Navbar>
    </>
  );
};

export default Header;
