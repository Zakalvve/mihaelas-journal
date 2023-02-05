import './App.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { EntryBrowser } from './pages/EntryBrowser';
import { About } from './pages/About'; 
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App" data-bs-theme="journal">
        <header>
          <Navbar expand="md">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/journal-browse">Journal</Nav.Link>
                  <Nav.Link as={Link}to="/about">About</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/journal" element={<Journal/>} />
              <Route path="/journal-browse" element={<EntryBrowser/>} />
              <Route path="/about" element={<About/>} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Navbar>
            <Container>
              <Nav className="me-auto p-5">
                <p>Test</p>
              </Nav>
            </Container>
          </Navbar>
        </footer>
      </div>
    </Router>
  );
}

export default App;
