import React from "react";
import { Link } from "react-router-dom";
import { journalDirectory } from "../modules/serverProxy";
import "./styles/Home.style.scss";
import { scrollToTop } from '../modules/Helpers';

export const Home = () => {

    const handleScrollTop = () => {
        scrollToTop(true);
    }
    return (
        <div className="intro pt-3 d-flex flex-column h-100">
            <h1 className="mb-3">The Tale of an Unlikely Hero</h1>

            <blockquote>To check out the first entry click the link below. It's reccomended to turn
                the soundscape on for full immersion. To do so you can find the sound and volume controls on the right side 
                of your screen. Just click on the arrow.</blockquote>

            <p>&emsp;A shrill mournful howl echoes through the dense woodland of the Briar Woods. Some say 
                that wolves roam these areas, others suggest even more. A local ranger and his son huddle 
                around their campfire trying to keep warm. It's clear the sound has done naught to settle 
                the lads nerves. Sensing his sons fear the man attempts to calm him.</p>
            
            <p><em>&emsp;"You know, when I was your age I would come out into these very woods with my father and at 
                times the sounds of the woods at night would put me on edge as well. Let me tell you a story, 
                to help keep your mind from wandering"</em>.
            </p>

            <p><em>&emsp;"Don't you think I'm a little old for childrens stories? No, I'll be alright. It's the cold 
                thats getting to me more pa"</em>.</p>

            <p>&emsp;With timing that suggests a test from the God's themselves, the howl once again rips through 
                the trees and out of the darkness from beyond the small isolated campsite. The boy can do little to stiffle his anxiety.</p>

            <p><em>&emsp;"You know son,"</em> The man continues. <em>"Mihaela Thorngage once camped in this very spot."</em></p>

            <p><em>&emsp;"Who's that? Iv'e never heard of him before"</em></p>

            <p>&emsp;The man smiles knowing he has piqued his sons interest.<em>"Why <strong>she</strong> was just a halfling, looking for somewhere to could call home. 
                Her life had not been easy but when destiny called she answered. You're sure I can't steal 
                your ear? It's a great story, one of my favourites it's got: dragons, kings and queens, epic treasures calimed 
                from ancient halls. But, too explain properly we would have to go back further. 
                My father said not much was known before the Carnival. That was where they met the 
                Goblin-Cleavers"</em>.</p>

            <p><em>&emsp;"They?"</em></p>

            <p><em>&emsp;"Of course! Mihaela was part of one of the most famous groups of adventurers to walk this fair land of Katya!"</em> He pauses for a few seconds aparently considering something...</p>
            
            <div className="story-emphasis flex-grow-1 d-flex flex-column-reverse p-3 pb-5">
                <Link onClick={handleScrollTop} to={`/journal/${journalDirectory.getFirstEntryId()}`} className='journal-link journal-quote'>Let me tell you her story.</Link>
            </div>
        </div>
    );
}