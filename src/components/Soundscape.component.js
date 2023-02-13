import { AudioManager, AudioData } from "../modules/Audio";
import { useState, useEffect } from "react";

export const Soundscape = () => {

    //the audio manager which controls playback
    const [controller, setController] = useState(null);

    //used to track and toggle playback
    const [isPlaying, setIsPlaying] = useState(false); //probably redundant -> move to controller

    useEffect(() => {
        let am;
        if (!controller){
            am = new AudioManager(AudioData.loops, AudioData.effects);
            setController(am);
        }

        setIsPlaying(false);

        return () => {
            if (am) am.Stop();
        };
    },[controller]);

    //handles a click event for the play/pause button
    const handleClick = (e) => {
        e.target.value === "play" ? controller.Play() : controller.Stop();
        isPlaying === true ? setIsPlaying(false) : setIsPlaying(true);
    }

    return (
        <>
            {isPlaying === true ? <button value="stop" onClick={handleClick}>Stop Soundscape</button> : <button value="play" onClick={handleClick}>Play Soundscape</button>}
        </>
    );
}