import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {default as BsNavbar} from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import "./styles/Navbar.style.scss";

export const Navbar = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(isExpanded === true ? false : true);
    }

    let timeoutId = null;
    const handleFocusOut = () => {
        timeoutId = setTimeout(() => {
            setIsExpanded(false);
        }, 200);
    }

    const handleFocusIn = () => {
        clearTimeout(timeoutId);
    }

    return (
        <div className="position-relative">
          <header className="py-3" onMouseLeave={handleFocusOut} onMouseEnter={handleFocusIn}>
            <Container className="d-flex justify-content-center position-relative z-1 h-100">
              <BsNavbar expand="md" expanded={isExpanded} onToggle={handleToggle} onSelect={handleFocusOut}>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav" className="animate slide-in">
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