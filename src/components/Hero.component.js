import "./styles/Hero.style.scss";
import { images } from "../assets/images";
export const Hero = () => {
    return (
        <section className="hero">
            <img src={images.bgTop} />
            <h1>Mihaela's Journal</h1>
        </section>
    );
}