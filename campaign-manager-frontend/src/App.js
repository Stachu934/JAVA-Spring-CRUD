import React from "react";
import CampaignList from "./components/CampaignList";

function App() {
    return (
        <div className="App">
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>This is the simple app for the campaign manager</h1>
            <CampaignList />
        </div>
    );
}

export default App;
