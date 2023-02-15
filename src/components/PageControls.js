import "../styles/PageControls.scss";
import { useState } from "react";
import { Soundscape } from "./Soundscape.component";

export const PageControls = () => {
    const scrollToTop = (smooth = false) => {
        if (smooth) {
            window.scrollTo({
            top: 0,
            behavior: "smooth",
            });
        } else {
            document.documentElement.scrollTop = 0;
        }
    };

    const handleScrollTop = () => {
        scrollToTop(true);
    }

    const [isSlide, setIsSlide] = useState(false);

    const slideOut = (e) => {
        if (isSlide){
            document.getElementById("page-controls").style.transform = "translate(0,0)";
            setIsSlide(false);
        } else {
            document.getElementById("page-controls").style.transform = "translate(-170px,0)";
            setIsSlide(true);
        }
    };

    return (
        <div id="page-controls">
            <div id="on-canvas">
                <div id="slide-out" onClick={slideOut}>
                    {isSlide ? <i className="bi bi-caret-right-fill"></i> : <i className="bi bi-caret-left-fill"></i>}
                </div>
                <div id="controls">
                    <button id="scroll-top" onClick={handleScrollTop}><i className="bi bi-arrow-up"></i></button>
                </div>
            </div>
            <div id="off-canvas">
                <Soundscape />
            </div>
        </div>
    );
}