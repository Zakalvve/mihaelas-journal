import {useState, useEffect } from "react";
import { SoundscapeManager } from "../modules/Audio";

export const Soundscape = () => {

    return (
        <div>{SoundscapeManager.CurrentlyPlaying}</div>
    );
}