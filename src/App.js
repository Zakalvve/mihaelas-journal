import './App.style.scss';
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar} from 'react-bootstrap/Navbar';
import { Navbar } from './components/Navbar.component';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { EntryBrowser } from './pages/EntryBrowser';
import { About } from './pages/About'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Hero } from './components/Hero.component';

function App() {
  try {
    //console.log(journalDirectory.getNode(3));
  } catch(error) {
    console.error(error);
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Container className="journal-page">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/journal-browse/:nodeId" element={<EntryBrowser/>} />
              <Route path="/journal-browse" element={<EntryBrowser/>} />
              <Route path="/journal/:entryId" element={<Journal/>} />
              <Route path="/journal" element={<Journal/>}/>
              <Route path="/about" element={<About/>} />
            </Routes>
          </Container>
        </main>
        <footer>
          <BsNavbar>
            <Container>
              <Nav className="me-auto p-5">
                <p>Test</p>
              </Nav>
            </Container>
          </BsNavbar>
        </footer>
      </div>
    </Router>
  );
}

export default App;
