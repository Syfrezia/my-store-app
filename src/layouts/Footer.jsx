import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { aboutUs, quickLinks, connectWithUs } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-success text-light py-5 px-2">
      <Container>
        <Row>
          <Col md={5} className="pe-lg-5">
            <h4 style={{ color: "#004000" }}>{aboutUs.title}</h4>
            <p>{aboutUs.content}</p>
          </Col>
          <Col md={3} className="my-3 my-md-0">
            <h4 style={{ color: "#004000" }}>{quickLinks.title}</h4>
            <Nav className="flex-column">
              <Link
                to={"/"}
                className="mx-0 px-0 py-1 text-light"
                style={{ textDecoration: "none" }}
              >
                {quickLinks.home}
              </Link>
              <Link
                as={Link}
                to={"/result"}
                className="mx-0 px-0 py-1 text-light"
                style={{ textDecoration: "none" }}
              >
                {quickLinks.products}
              </Link>
              <Nav.Link href="#" className="mx-0 px-0 py-1 text-light">
                {quickLinks.aboutUs}
              </Nav.Link>
              <Nav.Link href="#" className="mx-0 px-0 py-1 text-light">
                {quickLinks.contact}
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h4 style={{ color: "#004000" }}>{connectWithUs.title}</h4>
            <p>{connectWithUs.content}</p>
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
