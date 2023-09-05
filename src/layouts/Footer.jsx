import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-success text-light py-5 px-2">
      <Container>
        <Row>
          <Col md={5} className="pe-lg-5">
            <h4 style={{ color: "#004000" }}>About Us</h4>
            <p>
              We take pride in the relationships we've built with artisans,
              manufacturers, and suppliers who share our commitment to quality.
              Each product you find on our platform has been meticulously
              selected to ensure that it meets our stringent standards.
            </p>
          </Col>
          <Col md={3} className="my-3 my-md-0">
            <h4 style={{ color: "#004000" }}>Quick Links</h4>
            <Nav className="flex-column">
              <Link
                to={"/"}
                className="mx-0 px-0 py-1 text-light"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
              <Link
                as={Link}
                to={"/result"}
                className="mx-0 px-0 py-1 text-light"
                style={{ textDecoration: "none" }}
              >
                Products
              </Link>
              <Nav.Link href="#" className="mx-0 px-0 py-1 text-light">
                About Us
              </Nav.Link>
              <Nav.Link href="#" className="mx-0 px-0 py-1 text-light">
                Contact
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h4 style={{ color: "#004000" }}>Connect With Us</h4>
            <p>Follow us on social media for the latest updates:</p>
            <div className="d-flex">
              <a href="#" className="me-3 text-light fs-3">
                <FaFacebook />
              </a>
              <a href="#" className="me-3 text-light fs-3">
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-3">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="mt-4 text-center">
        <p>&copy; 2023 FakeStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
