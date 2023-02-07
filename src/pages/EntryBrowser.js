import React, { useState } from "react";
import { journalDirectory } from "../modules/serverProxy";
import { JournalBreadcrumbs } from "../components/JournalBreadcrumbs.component";
import { Link, useParams } from "react-router-dom";

export const EntryBrowser = () => {

    let { nodeId } = useParams();
    if (!nodeId) nodeId = journalDirectory.root.id;

    const [journalNode, setJournalNode] = useState(journalDirectory.findById(nodeId));

    if (journalNode.id != nodeId){
        console.log("page changed");
        setJournalNode(journalDirectory.findById(nodeId));
    }


    return (
        <>
            <JournalBreadcrumbs path={journalNode.data.fullPath}/>
            <div className="d-flex flex-column">
            {
                journalNode.children.map(child => {
                    return (
                        child.data.type === "folder"
                        ? <Link key={child.id} to={`/journal-browse/${child.id}`}>{child.data.path}</Link>
                        : <Link key={child.id} to={`/journal/${child.id}`}>{child.data.path}</Link>
                    );
                })
            }
            </div>
        </>
    );
}