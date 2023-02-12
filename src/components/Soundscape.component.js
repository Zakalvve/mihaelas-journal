import { SoundscapeManager } from "../modules/Audio";
import { useState } from "react";

export const Soundscape = () => {

    const [toggle, setToggle] = useState(false);

    const handleClick = (e) => {
        e.target.value === "play" ? SoundscapeManager.Play() : SoundscapeManager.Stop();
        toggle === true ? setToggle(false) : setToggle(true);
    }

    return (
        <>
            {toggle === true ? <button value="stop" onClick={handleClick}>Stop Soundscape</button> : <button value="play" onClick={handleClick}>Play Soundscape</button>}
            <div>{SoundscapeManager.CurrentlyPlaying}</div>
        </>
    );
}