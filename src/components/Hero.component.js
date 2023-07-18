import "./styles/Hero.style.scss";
import { images } from "../assets/images";
import Image from "./image.component";
export const Hero = () => {
    return (
        <section className="hero">
            <Image {...images.bgTop.img} />
            <h1>Mihaela's Journal</h1>
        </section>
    );
}