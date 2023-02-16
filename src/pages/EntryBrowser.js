import React, { useState } from "react";
import { journalDirectory } from "../modules/serverProxy";
import { JournalBreadcrumbs } from "../components/JournalBreadcrumbs.component";
import { Link, useParams } from "react-router-dom";
import { EntryDocument } from "../components/EntryDocument.component";
import "./styles/EntryBrowser.style.scss";

export const EntryBrowser = () => {

    let { nodeId } = useParams();
    if (!nodeId) nodeId = journalDirectory.root.id;

    const [journalNode, setJournalNode] = useState(journalDirectory.findById(nodeId));

    if (journalNode.id !== +nodeId){
        console.log("page changed");
        console.log(`pageid type: ${typeof(nodeId)}. NodeId: ${typeof(journalNode.id)}`);
        setJournalNode(journalDirectory.findById(nodeId));
    }


    return (
        <>
            <JournalBreadcrumbs path={journalNode.data.fullPath}/>
            <div id="directory" className="d-flex flex-wrap">
            {
                journalNode.children.map(child => {
                    return (
                        child.data.type === "folder"
                        ? <Link key={child.id} to={`/journal-browse/${child.id}`}><EntryDocument type={child.data.type} name={child.data.path}/></Link>
                        : <Link key={child.id} to={`/journal/${child.id}`}><EntryDocument type={child.data.type} name={child.data.path}/></Link>
                    );
                })
            }
            </div>
        </>
    );
}