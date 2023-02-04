import React, { useState, useEffect } from 'react';
import MarkdownView from 'react-showdown';
import "./journal-entry.styles.scss"
import { fetchSiteData } from "../../serverProxy";

export const JournalEntry = ({path}) => {
    const [markdown, setMarkdown] = useState("");
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        try {
            setMarkdown(fetchSiteData(path).data);
        }
        catch(error){
            console.log(error);
            setLoadError(true);
        }
    }, [path]);

    return (
        <div id="journal-entry">
            {loadError ? <p>Error</p> : <MarkdownView markdown={markdown}/>}
        </div>
    );
  };
