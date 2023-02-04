import './App.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { JournalEntry } from './components/journal-entry/journal-entry.component';
import { JournalSearch } from './components/journal-search/journal-search.component';

function App() {

  const [entryPath, setEntryPath] = React.useState("./entries/861/Teragoth/01-10-861-Taramont.md");

  const handleChange = (path = "") => {
    setEntryPath(path);
    console.log("This is a test");
  }

  return (
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Journal</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <JournalSearch onChange={handleChange} />
          <JournalEntry path={entryPath}/>
        </Container>
      </main>
      <footer>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <p>Testing testing 123...</p>
            </Nav>
          </Container>
        </Navbar>
      </footer>
    </div>
  );
}

export default App;
