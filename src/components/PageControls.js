import "./styles/PageControls.style.scss";
import { useState } from "react";
import { Soundscape } from "./Soundscape.component";
import { scrollToTop } from "../modules/Helpers";

export const PageControls = () => {

    const handleScrollTop = () => {
        scrollToTop(true);
    }

    const [isSlide, setIsSlide] = useState(false);

    const slideOut = (e) => {
        if (isSlide){
            document.getElementById("page-controls").style.transform = "translate(0,0)";
            setIsSlide(false);
        } else {
            document.getElementById("page-controls").style.transform = "translate(-175px,0)";
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