import React, { useState, useEffect } from 'react';
import MarkdownView from 'react-showdown';
import "./styles/JournalEntry.style.scss"
import { Link } from 'react-router-dom';

export const JournalEntry = ({entryNode, onClick}) => {
    const [markdown, setMarkdown] = useState(entryNode.data.file.data);
    const [loadError, /*setLoadError*/] = useState(false);

    useEffect(() => {
        setMarkdown(entryNode.data.file.data);
    },[entryNode]);

    /*const handleLoadError = () => {
        setLoadError(true);
    }*/
    const previousId = () => {
        if (entryNode.data.traversal.last)
            return entryNode.data.traversal.last.data.id;
        else return entryNode.id;
    }
    const nextId = () => {
        if (entryNode.data.traversal.next)
            return entryNode.data.traversal.next.data.id;
        else 
            return entryNode.id;
    }

    return (
        <div id="journal-entry">
            {loadError ? <p>Error</p> : <MarkdownView markdown={markdown}/>}
            <Link className="btn btn-primary" to={`/journal/${previousId()}`}>Pervious</Link>
            <Link className="btn btn-primary" to={`/journal/${nextId()}`}>Next</Link>
        </div>
    );
  };
