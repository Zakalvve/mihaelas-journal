import './App.style.scss';
import React from "react";
import Container from 'react-bootstrap/Container';
import { Navbar } from './components/Navbar.component';
import { Home } from './pages/Home';
import { Journal } from './pages/Journal';
import { EntryBrowser } from './pages/EntryBrowser';
import { About } from './pages/About'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Hero } from './components/Hero.component';
import { Footer } from './components/Footer.component';
import { PageControls } from './components/PageControls';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar/>
        <main id='min-page'>
          <Hero />
          <section id='content'>
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
          </section>
        </main>
        <Footer />
        <PageControls />
      </div>
    </Router>
  );
}

export default App;