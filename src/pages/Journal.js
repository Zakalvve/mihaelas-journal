import React, { useState } from "react";
import { journalDirectory } from "../serverProxy";
import { JournalEntry } from "../components/JournalEntry/JournalEntry.component";
import { JournalSearch } from "../components/JournalSearch/JournalSearch.component";
import { Link, useParams } from 'react-router-dom';

export const Journal = () => {
    let { entryId } = useParams();
    if (!entryId) entryId = journalDirectory.getFirstEntryId();
    const [dataNode, setDataNode] = useState(journalDirectory.findById(entryId));

    //callback to change the displayed journal entry
    const loadEntry = (id) => {
        setDataNode(journalDirectory.findById(id));
    }

    return(
        <>
            {/*<JournalSearch onChange={loadEntry} />*/}
            <JournalEntry onClick={loadEntry}entryNode={dataNode}/>
        </>
    );
}