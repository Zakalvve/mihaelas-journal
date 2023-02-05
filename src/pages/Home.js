import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="mt-5">
            <h1 className="mb-3">Welcome to Mihaelas journal</h1>

            <p>This is a public place to browse the ups and downs of the rougish halflings adventures through the lands of Katya.</p>

            <p>This journal was written by Michael as a part of the ongoing DnD campaign A Matter of Blood.</p>

            <Link to="/journal">Check out the first entry and go from there</Link>
        </div>
    );
}