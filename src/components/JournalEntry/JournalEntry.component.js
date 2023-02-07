import React, { useState, useEffect } from 'react';
import MarkdownView from 'react-showdown';
import "./JournalEntry.styles.scss"

export const JournalEntry = ({entryNode, onClick}) => {
    const [markdown, setMarkdown] = useState(entryNode.data.file.data);
    const [loadError, /*setLoadError*/] = useState(false);

    useEffect(() => {
        setMarkdown(entryNode.data.file.data);
    },[entryNode]);

    /*const handleLoadError = () => {
        setLoadError(true);
    }*/
    const handleClickPrevious = () => {
        try {
            onClick(entryNode.data.traversal.last.data.id);
        } catch(error){
            console.log("User tried to click previous on the first entry.");
            console.log(error);
        }
    }
    const handleClickNext = () => {
        try {
        onClick(entryNode.data.traversal.next.data.id);
        } catch (error) {
            console.log("User tried to click previous on the first entry.");
            console.log(error);
        }
    }

    return (
        <div id="journal-entry">
            {loadError ? <p>Error</p> : <MarkdownView markdown={markdown}/>}
            <button onClick={handleClickPrevious}>Pervious</button>
            <button onClick={handleClickNext}>Next</button>
        </div>
    );
  };
