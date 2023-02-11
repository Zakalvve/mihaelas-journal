import { Navbar, Container, Nav } from "react-bootstrap";

export const Footer = () => {
    return (
        <div className="footer-theme">
            <footer>
                <Navbar>
                    <Container>
                        <Nav className="mx-auto p-4">
                            <p>Journal written My Michael Baker as Mihaela Thorngauge</p>
                        </Nav>
                    </Container>
                </Navbar>
            </footer>
        </div>
    );
}