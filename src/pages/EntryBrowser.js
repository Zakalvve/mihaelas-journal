import React, { useState } from "react";
import { journalDirectory } from "../serverProxy";
import { Link } from "react-router-dom";

export const EntryBrowser = () => {

    const [journalNode, setJournalNode] = useState(journalDirectory.root);
    const handleClick = ({target}) => {
        setJournalNode(journalDirectory.findByPath(target.value));
    }

    return (
        <>
            {
                journalNode.children.map(child => {
                    return (
                        child.data.type === "folder"
                        ? <button key={child.id} value={child.data.fullPath} onClick={handleClick}>{child.data.path}</button>
                        : <Link key={child.id} to={`/journal/${child.id}`}>{child.data.path}</Link>
                    );
                })
            }
        </>
    );
}