import React from "react";
import { JournalEntry } from "../components/JournalEntry/JournalEntry.component"
import { JournalSearch } from "../components/JournalSearch/JournalSearch.component"

export const Journal = () => {
    
    const [entryPath, setEntryPath] = React.useState("./entries/861/Teragoth/01-10-861-Taramont.md");

    //callback to change the displayed journal entry
    const loadEntry = (path = "") => {
        setEntryPath(path);
    }

    return(
        <>
            <JournalSearch onChange={loadEntry} />
            <JournalEntry path={entryPath}/>
        </>
    );
}