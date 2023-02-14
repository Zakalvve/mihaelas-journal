import { AudioManager, AudioData } from "../modules/Audio";
import { useState, useEffect } from "react";

export const Soundscape = () => {

    //the audio manager which controls playback
    const [controller, setController] = useState(null);

    const [oldVolumeValue, setOldVolumeValue] = useState(0);

    const [volumeValue, setVolumeValue] = useState(100);
    const handleVolumeChange = ({target}) => {
        if (!isMuted) {
            changeVolume(target.value);
        }
    }

    const [isMuted, setIsMuted] = useState(false);
    const handleToggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            changeVolume(oldVolumeValue);
        } else {
            setIsMuted(true);
            setOldVolumeValue(volumeValue);
            changeVolume(0);
        }
    }

    const [isPlaying, setIsplaying] = useState(false);
    const handleTogglePlayback = () => {
        if (isPlaying) {
            setIsplaying(false);
            controller.Pause();
        } else {
            setIsplaying(true);
            controller.Play();
        }
    }

    const changeVolume = (value) => {
        setVolumeValue(value);
        controller.Volume = value;
    }

    useEffect(() => {
        let am = new AudioManager(AudioData.loops, AudioData.effects);
        setController(am);

        return () => {
            if (am) am.Stop();
        };
    },[]);

    return (
        <>
            <div id="volume-controls">
                <label>{volumeValue}</label>
                <input id="volume" type="range" min="0" max="100" className="slider" value={volumeValue} onChange={handleVolumeChange} />
            </div>
            <div id="playback-controls">
                <button id="toggle-playback" onClick={handleTogglePlayback}>{ isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}</button>
                <button id="toggle-mute" onClick={handleToggleMute}>{isMuted ? <i className="bi bi-volume-mute-fill"></i> : <i className="bi bi-volume-up-fill"></i>}</button>
            </div>
        </>
    );
}