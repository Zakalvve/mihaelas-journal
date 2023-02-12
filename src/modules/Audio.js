//import all files
import campFire from "../assets/audio/fire.ogg";
import scribble_1 from "../assets/audio/01-quill-scratches.ogg";
import scribble_2 from "../assets/audio/02-quill-scratches.ogg";
import scribble_3 from "../assets/audio/03-quill-scratches.ogg";
import scribble_4 from "../assets/audio/04-quill-scratches.ogg";
import scribble_5 from "../assets/audio/05-quill-scratches.ogg";
import wolfHowl_1 from "../assets/audio/01-wolf-howl.ogg";
import wolfHowl_2 from "../assets/audio/02-wolf-howl.ogg";
import wolfHowl_3 from "../assets/audio/03-wolf-howl.ogg";
import forestAmbience from "../assets/audio/ambience.ogg";

//create and export data audio components
const AudioData = {
    loops: [
        {
            sound: new Audio(campFire),
            volume: 0.35
        }, 
        { 
            sound: new Audio(forestAmbience),
            volume: 0.12
        }
    ],
    effects: [
        {
            name: "quillFx",
            spacing: 4300,
            deviation: 0.8,
            volume: 1,
            clips: [
                new Audio(scribble_1),
                new Audio(scribble_2),
                new Audio(scribble_3),
                new Audio(scribble_4),
                new Audio(scribble_5)
            ]
        },
        {
            name: "howlFx",
            spacing: 60000,
            deviation: 1,
            volume: 0.05,
            clips: [
                new Audio(wolfHowl_1),
                new Audio(wolfHowl_2),
                new Audio(wolfHowl_3)
            ]
        }
    ]
};

//Process
    //load sounds
    //begin loops
    //push each sound onto a setInterval with random duration
        //on callback push the effect onto the effect queue
    //initialise a 500ms update loop
    //Every 500ms
        //Are there sounds in the effect queue to play?
        //If yes has enough time passed since the last effect?
        //If yes we can play the effect.
        //Set is playing = true and set callback for when sound effect ends which sets playing = false and records the time at end of playing
        //We also can set an interval for when this sound should play again

    //loopers - array of tracks which are looped in the soundscape
    //effects - array of arrays which store grouped sound effects together, which track to play is decided randomly between available effects
    //effectQueue - queue of effects waiting to be played

/* Data structure for an loops input
[
       //array of sounds
]*/

/* Data structure for an effects input
[
    {
        duration: 30000,    //in ms
        deviation: 0.05,    //represents a percentage of duration added to duration
        clips: []           //the clips which this effect can choose from
    }
]*/

class AudioManager {
    //Initialize
    constructor(loops, effects){
        //initialise our looping sounds
        this._loops = loops;
        //initialise our sound effects
        this._effects = effects;
        
        this.ProcessInputAudio();

        //create our effect queue
        this._effectQueue = new EffectQueue();
        this._currentUpdateId = null;

        //bind this instance of the AudioManager to all the methods that require a this reference during callbacks
        this.BeginUpdateLoop = this.BeginUpdateLoop.bind(this);
        this.OnUpdate = this.OnUpdate.bind(this);
        this.TryEffect = this.TryEffect.bind(this);
        this.BeginLoops = this.BeginLoops.bind(this);
        this.BeginEffects = this.BeginEffects.bind(this);
    }

    get CurrentlyPlaying() {
        return this._currentEffect ? this._currentEffect.name : "None";
    }

     //process sounds
     ProcessInputAudio(){
        for (let clip of this._loops){
            clip.sound.loop = true;
            clip.sound.autoplay = true;
            clip.sound.muted = true;
            clip.sound.volume = clip.volume;
        }

        for (let effect of this._effects){
            for (let clip of effect.clips){
                clip.autoplay = true;
                clip.muted = true;
                clip.volume = effect.volume;
            }
        }
    }

    //Controls
    InitializePlay(){
        //set our default current effect to null
        this._currentEffect = {effect: null, clip: null, isPlaying: false};
        //set that this time of initialization is the time the last sound was played
        this._soundFinishedAt = Math.floor(Date.now());
        //declate a variable that dictates the minimum time between effects in ms
        this._minTimeBetweenEffects = 2100;
        //a list of active effect timeouts
        this._activeTimeouts = new Map();
    }

    Play(){
        this.InitializePlay();
         //start our looping sounds
         this.BeginLoops();
         //begin our effect callback system
         this.BeginEffects();
 
         //begin update loop and store reference to its id
         this._currentUpdateId = setTimeout(this.BeginUpdateLoop,500);
    }

    Stop(){
        this.Destroy();
    }

    //Turns the update loop on
    BeginUpdateLoop(){
        this._currentUpdateId = setTimeout(this.BeginUpdateLoop, 500);
        this.OnUpdate();
    }

    //starts playing the sounds which simply loop
    BeginLoops(){
        for (let audio  of this._loops){
            audio.sound.muted = false;
            audio.sound.play();
        }
    }

    //this function creates setTimeouts for 
    BeginEffects(){
        //it is worth noting that "an" effect may contain multiple sound clips which are played randomly
        for (let effect of this._effects){
            let clipIndex = Math.floor(Math.random() * effect.clips.length);
            let timeTillPlay = effect.spacing + (effect.spacing * Math.random() * effect.deviation);
            this._activeTimeouts.set(effect.name, this.RegisterEffect(effect, clipIndex, timeTillPlay));
        }
    }
    //called every 500 ms when the audio manager updates itself
    OnUpdate(){
        //handle terminating conditions
        let timeSinceLastSound = Math.floor(Date.now()) - this._soundFinishedAt;
        if (this._currentEffect.isPlaying || timeSinceLastSound < this._minTimeBetweenEffects || this._effectQueue.length === 0) return;
        
        //we are free to play an effect
        let effectData = this._effectQueue.Dequeue();
        let effect = effectData.effect;
        effectData.effect.clips[effectData.clip].muted = false;
        effectData.effect.clips[effectData.clip].play();

        //set the state of the audio manager to record the currently playing effect
        this._currentEffect.effect = effect;
        this._currentEffect.clip = effectData.clip;
        this._currentEffect.isPlaying = true;

        //set a callback that is triggered when the effect stops playing
        effectData.effect.clips[effectData.clip].onended = () => {
            this._currentEffect.isPlaying = false;
            this._soundFinishedAt = Math.floor(Date.now());

            //re-register this effect
            let timeTillPlay = effect.spacing + (effect.spacing * Math.random() * effect.deviation);
            let clipIndex = Math.floor(Math.random() * effect.clips.length);
            this.RegisterEffect(effectData.effect, clipIndex, timeTillPlay);
        };
    }


    RegisterEffect(fx, fxi, timeTillPlay){
        return setTimeout(() => {
            this.TryEffect(fx, fxi);
        },timeTillPlay);
    }

    TryEffect(fx, fxi){
        //if we can play right away - just play it - CHANGE TO SUPPORT THIS
        this._effectQueue.Enqueue({effect: fx, clip: fxi});
    }
    //should be called when this object is no longer required
    Destroy(){

        //stop update loop
        clearTimeout(this._currentUpdateId);

        //stop all looping sounds
        for (let audio  of this._loops){
            audio.stop();
        }

        //stop any currently playing effects
        if (this._currentEffect.isPlaying){
            this._currentEffect.effect.clips[this._currentEffect.clip].stop();
        }
    }
}

class EffectQueue {
    
    constructor(){
        this._effects = [];
    }

    get length() {
        return this._effects.length;
    }

    get isEmpty() {
        return this._effects.lenght === 0;
    }

    Enqueue(effect){
        return this._effects.push(effect);
    }

    Dequeue(){
        if (this.length > 0){
            return this._effects.shift();
        }
    }

    Empty(){
        this._effects = null;
    }
}

export const SoundscapeManager = new AudioManager(AudioData.loops, AudioData.effects);