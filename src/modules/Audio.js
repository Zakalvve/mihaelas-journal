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
export const AudioData = {
    loops: [
        {
            sound: new Audio(campFire),
            volume: 0.55
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


/*
This Audio Manager has two concurent systems.

Firstly it controls the playback of any number of loopable tracks which are provided to it as the loops parameter.

Secondly it controls the construction of a soundscape by managing an update loop which registers sound effects at semi-random
intervals. The effects are then queued in an effect queue and played when it is possible to play them.

This creates a multilayed soundscape.
*/
export class AudioManager {
    //INITIALIZE
    constructor(loops, effects){
        //initialise our looping sounds
        this._loops = loops;
        //initialise our sound effects
        this._effects = effects;
        //sets up the input audio files for use within this system
        this.ProcessInputAudio();

        //create our effect queue
        this._effectQueue = new EffectQueue();
        //stores the id value of the updateloops timeout so it can be cleared later if required
        this._currentUpdateId = null;
        //a list of active effect timeout id so they can be cleared later if required
        this._activeTimeouts = new Map();

        //set our default current effect to null
        this._currentEffect = {effect: null, clip: null, isPlaying: false};
        //declate a variable that dictates the minimum time between effects in ms
        this._minTimeBetweenEffects = 2100;
        
        //bind this instance of the AudioManager to all the methods that require a this reference during callbacks
        this.InitializeLoops = this.InitializeLoops.bind(this);
        this.InitializeEffects = this.InitializeEffects.bind(this);
        this.UpdateLoop = this.UpdateLoop.bind(this);
        this.Update = this.Update.bind(this);
        this.QueueEffect = this.QueueEffect.bind(this);
    }

     //process input sounds
     ProcessInputAudio(){
        for (let clip of this._loops){
            clip.sound.loop = true;
            clip.sound.autoplay = true;
            clip.sound.muted = true;
            clip.sound.volume = clip.volume;
            //ensure playback does not "skip" when the loop restarts
            clip.sound.addEventListener('timeupdate', function(){
                var buffer = .44;
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0;
                    this.play();
                }
            });
        }

        for (let effect of this._effects){
            for (let clip of effect.clips){
                clip.autoplay = true;
                clip.muted = true;
                clip.volume = effect.volume;
            }
        }
    }

    //PROPERTIES
    get CurrentlyPlaying() {
        return this._currentEffect ? this._currentEffect.name : "None";
    }

    //MORE PROPERTIES TO ADD
    //is the soundscape playing?
    //is a sound effect playing?
    //volume
    
    //manager can be in three possible states. Playing, paused or stopped.
    //It can be either playing or paused. IsPlaying = false === IsPaused = true

    //CONTROLS
    Play(){
        this.InitializePlay();
        //start our looping sounds
        this.InitializeLoops();
        //begin our sound effect callback system
        this.InitializeEffects();

        //begin update loop and store reference to its id
        this.UpdateLoop();
    }

    InitializePlay(){
        //set that this time of initialization is the time the last sound was played
        this._soundFinishedAt = Math.floor(Date.now());
    }

    //starts playing the sounds which simply loop
    InitializeLoops(){
        for (let audio  of this._loops){
            audio.sound.muted = false;
            audio.sound.play();
        }
    }

    //this function creates setTimeouts for 
    InitializeEffects(){
        //it is worth noting that "an" effect may contain multiple sound clips which are played randomly
        for (let effect of this._effects){
            this._activeTimeouts.set(effect.name, this.RegisterEffect(effect));
        }
    }

    //Turns the update loop on
    UpdateLoop(){
        this._currentUpdateId = setTimeout(this.UpdateLoop, 500);
        this.Update();
    }

    Pause() {
        //pause playback and continue where we left off when play resumes
    }

    //stop all playback and clean up all processes
    Stop(){
        this.Destroy();
    }

    //should be called when this object is no longer required
    Destroy(){

        //stop update loop
        clearTimeout(this._currentUpdateId);

        //stop all looping sounds
        for (let audio  of this._loops){
            audio.sound.pause();
        }

        //stop any currently playing sound effects
        if (this._currentEffect.isPlaying){
            this._currentEffect.effect.clips[this._currentEffect.clip].pause();
        }

        for (let id of this._activeTimeouts){
            if (id) {
                clearTimeout(id);
            }
        }
        this._activeTimeouts.clear();
    }


    //UPDATE
    //called every 500 ms when the audio manager updates itself
    Update(){
        //handle terminating conditions
        let timeSinceLastSound = Math.floor(Date.now()) - this._soundFinishedAt;
        if (this._currentEffect.isPlaying || timeSinceLastSound < this._minTimeBetweenEffects || this._effectQueue.length === 0) return;
        
        //we are free to play a sound effect
        let { effect, clip} = this._effectQueue.Dequeue();
        effect.clips[clip].muted = false;
        effect.clips[clip].play();

        //set the state of the audio manager to record the currently playing effect
        this._currentEffect.effect = effect;
        this._currentEffect.clip = clip;
        this._currentEffect.isPlaying = true;

        //set a callback that is triggered when the sound effect stops playing
        effect.clips[clip].onended = () => {
            //change the status of is playing and record the time it finished playing
            this._currentEffect.isPlaying = false;
            this._soundFinishedAt = Math.floor(Date.now());

            //re-register this effect
            this._activeTimeouts.set(effect.name, this.RegisterEffect(effect));
        };
    }

    //creates a new timeout callback for an effect and returns the id of the timeout created
    RegisterEffect(fx){
        let timeTillPlay =fx.spacing + (fx.spacing * Math.random() * fx.deviation);
        let fxi = Math.floor(Math.random() * fx.clips.length);
        return setTimeout(() => {
            this.QueueEffect(fx, fxi);
        },timeTillPlay);
    }

    //Add an effect that is ready to play onto the effect queue
    QueueEffect(fx, fxi){
        this._effectQueue.Enqueue({effect: fx, clip: fxi});
    }
}

//simple queue structure for managing sound effects as they become ready to play
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