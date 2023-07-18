import { Navbar, Container, Nav } from "react-bootstrap";
import { images } from "../assets/images";
import "./styles/Footer.style.scss"
import Picture from "./picture.component";

export const Footer = () => {
    return (
        <div className="footer-theme">
            <Picture sources={[]}>
                <img {...images.bgBottom.img} />
            </Picture>
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