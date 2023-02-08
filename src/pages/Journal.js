import React, { useState, useEffect } from "react";
import { journalDirectory } from "../modules/serverProxy";
import { JournalEntry } from "../components/JournalEntry.component";
import { JournalBreadcrumbs } from "../components/JournalBreadcrumbs.component";
//import { JournalSearch } from "../components/JournalSearch.component";
import { /*Link,*/ useParams } from 'react-router-dom';
import song from "./fire.ogg";

export const Journal = () => {
    const [audio, SetAudio] = useState("");
    const Playit = () => {
        audio.play();
        audio.loop = true;
      };
      const Stopit = () => {
        audio.pause();
      };
      useEffect(() => {
        SetAudio(new Audio(song));
      }, []);

    let { entryId } = useParams();
    if (!entryId) entryId = journalDirectory.getFirstEntryId();
    const [dataNode, setDataNode] = useState(journalDirectory.findById(entryId));
    
    //callback to change the displayed journal entry
    const loadEntry = (id) => {
        setDataNode(journalDirectory.findById(id));
    }

        
    if (dataNode.id !== +entryId){
        loadEntry(entryId);
    }

    return(
        <>
        <JournalBreadcrumbs path={dataNode.data.fullPath} />
        <button onClick={Playit}>Play</button>
        <button onClick={Stopit}>Stop</button>
            {/*<JournalSearch onChange={loadEntry} />*/}
            <JournalEntry entryNode={dataNode}/>
        </>
    );
}