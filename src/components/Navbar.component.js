import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {default as BsNavbar} from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="position-relative">
          <header className="py-3">
            <Container className="d-flex justify-content-center position-relative z-1 h-100">
              <BsNavbar expand="md">
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/journal-browse">Journal</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                  </Nav>
                </BsNavbar.Collapse>
              </BsNavbar>
            </Container>
          </header>
        </div>
    );
}