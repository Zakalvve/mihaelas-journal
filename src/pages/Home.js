import React from "react";
import { Link } from "react-router-dom";
import { journalDirectory } from "../modules/serverProxy";
import "./styles/Home.style.scss";

export const Home = () => {
    return (
        <div className="intro pt-4 d-flex flex-column h-100">
            <h1 className="mb-3">The Tale of an Unlikely Hero</h1>

            <blockquote>To check out the first entry click the link below. It's reccomended to turn on 
                the soundscape for full immersion. Sound and volume controls can be found on the right side 
                of your screen.</blockquote>

            <p>A shrill mournful howl echoes through the dense woodland of the Briar Woods. Some say 
                that wolves roam these areas, others suggest even more. A local ranger and his son huddle 
                around their campfire trying to keep warm. It's clear the sound has done naught to settle 
                the lads nerves.</p>
            
            <p><em>"You know, when I was your age I would come out into these very woods with my father and at 
                times the sounds of the woods at night would put me on edge as well. Let me tell you a story, 
                to help keep your mind from wandering"</em>.
            </p>

            <p><em>"Don't you think I'm a little old for childrens stories? No, I'll be alright. It's the cold 
                thats getting to me more pa"</em>.</p>

            <p>With timing that suggests a test from the God's themselves, the howl once again rips through 
                the trees and out of the darkness beyond the small isolated campsite.</p>

            <p>The boy can do little to stiffle his anxiety.</p>

            <p><em>"You know son, Mihaela Thorngage once camped in this very spot."</em></p>

            <p><em>"Who's that?"</em></p>

            <p>The man smiles. <em>"Why she was just a halfling, looking for somewhere she could call home. 
                Her life had not been easy but when destiny called to her she answered. Sure I can't steal 
                your ear? It has all the good stuff: dragons, kings and queens, epic treasures calimed 
                from ancient halls of terror. But, too explain properly we would have to go back further. 
                My father said not much was known before the Carnival. That was where they met the 
                Goblin-Cleavers"</em>.</p>

            <p><em>"They?"</em></p>

            <p><em>"Of course, Mihaela was part of one of the most famous groups of adventurers to walk this fair land of Katya. But this is her story..."</em></p>
            
            <div className="journal-link flex-grow-1 d-flex flex-column-reverse p-3 pb-5">
                <Link to={`/journal/${journalDirectory.getFirstEntryId()}`}>Check out the first entry and go from there</Link>
            </div>
        </div>
    );
}