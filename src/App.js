import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { JournalEntry } from './components/JournalEntry/journal-entry.component';

function App() {
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
          <JournalEntry/>
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
