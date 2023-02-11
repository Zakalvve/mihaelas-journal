import React, { useState, useEffect } from "react";
import { journalDirectory } from "../modules/serverProxy";
import { JournalEntry } from "../components/JournalEntry.component";
import { JournalBreadcrumbs } from "../components/JournalBreadcrumbs.component";
//import { JournalSearch } from "../components/JournalSearch.component";
import { /*Link,*/ useParams } from 'react-router-dom';
import { Soundscape } from "../components/Soundscape.component";

export const Journal = () => {

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
            <Soundscape />
            <JournalBreadcrumbs path={dataNode.data.fullPath} />
        
            {/*<JournalSearch onChange={loadEntry} />*/}
            <JournalEntry entryNode={dataNode}/>
        </>
    );
}