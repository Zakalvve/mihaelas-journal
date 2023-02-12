import { SoundscapeManager } from "../modules/Audio";

export const Soundscape = () => {

    const handleClick = () => {
        SoundscapeManager.Play();
    }

    return (
        <>
            <button onClick={handleClick}>Play</button>
            <div>{SoundscapeManager.CurrentlyPlaying}</div>
        </>
    );
}