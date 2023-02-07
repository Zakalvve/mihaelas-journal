import React from "react";
import { Link } from "react-router-dom";
import { journalDirectory } from "../modules/serverProxy";

export const Home = () => {
    return (
        <div className="pt-5 d-flex flex-column h-100">
            <h1 className="mb-3">Welcome to Mihaelas journal</h1>

            <p>This is a public place to browse the ups and downs of the rougish halflings adventures through the lands of Katya.</p>

            <p>This journal was written by Michael as a part of the ongoing DnD campaign A Matter of Blood.</p>
            
            <div className="flex-grow-1 d-flex flex-column-reverse p-3 pb-5">
                <Link to={`/journal/${journalDirectory.getFirstEntryId()}`}>Check out the first entry and go from there</Link>
            </div>
        </div>
    );
}