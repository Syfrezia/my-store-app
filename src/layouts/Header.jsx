import { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { CartButton, CategoriesButton } from "../components";
import { Link } from "react-router-dom";
import Search from "../features/search-bar/Search";
import Cart from "../features/cart-component/Cart";
import FilterOverlay from "../components/filter/FilterOverlay";
import { useCart } from "../contexts/CartProvider";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayZindex, setOverlayZindex] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { calculateTotalQuantity } = useCart();

  const toggleCart = () => {
    isCartOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true);
    setOverlayZindex((prev) => (prev === 1 ? 10 : 1));
    setIsCartOpen((prev) => !prev);
  };

  const toggleCartOff = () => {
    isCartOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true);
    setOverlayZindex((prev) => (prev === 1 ? 10 : 1));
    setIsCartOpen(false);
  };

  const renderBrand = (
    <Navbar.Brand as={Link} to="/" className="fs-3 py-0 fw-semibold">
      <span style={{ color: "#004000" }}>Fake</span>
      <span className="text-light">Store</span>
    </Navbar.Brand>
  );

  const desktopHeader = (
    <>
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />

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
            <Search setIsOverlayOpen={setIsOverlayOpen} />
          </Col>
          <Col lg={3} className="d-flex justify-content-end px-0">
            <CategoriesButton />
            <CartButton
              toggleCart={toggleCart}
              calculateTotalQuantity={calculateTotalQuantity}
            />
          </Col>
        </Row>
      </Container>
    </>
  );

  const mobileHeader = (
    <>
      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />

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
            <CategoriesButton />
            <CartButton
              toggleCart={toggleCart}
              calculateTotalQuantity={calculateTotalQuantity}
            />
          </Col>
        </Row>
        <Row className="p-0 m-0" style={{ width: "100%" }}>
          <Col
            md={{ span: 10, offset: 1 }}
            className="d-flex justify-content-between px-0"
          >
            <Search setIsOverlayOpen={setIsOverlayOpen} />
          </Col>
        </Row>
      </Container>
    </>
  );

  const header = isMobile ? mobileHeader : desktopHeader;

  return (
    <>
      <Navbar expand="lg" className="bg-success navbar-success" sticky="top">
        {isOverlayOpen && (
          <FilterOverlay
            overlayZindex={overlayZindex}
            toggleCartOff={toggleCartOff}
          />
        )}
        {header}
      </Navbar>
    </>
  );
};

export default Header;
