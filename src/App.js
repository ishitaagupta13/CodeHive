import React from "react";
import HackathonSearch from "./HackathonSearch";
import "./index.css";

function App() {
    return (
        <div>
            <header>
                <h1>Hackathon Discovery Engine</h1>
                <p>Find the perfect hackathon for your skills</p>
            </header>
            <HackathonSearch />
        </div>
    );
}

export default App;
