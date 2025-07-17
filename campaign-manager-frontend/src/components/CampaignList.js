import React, { useEffect, useState } from "react";
import { getAllCampaigns, deleteCampaign } from "../api/campaignService";
import CampaignForm from "./CampaignForm";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [editingCampaign, setEditingCampaign] = useState(null);

    const fetchCampaigns = () => {
        getAllCampaigns()
            .then((res) => setCampaigns(res.data))
            .catch((err) => console.error("Błąd pobierania kampanii:", err));
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleDelete = (id) => {
        deleteCampaign(id)
            .then(() => fetchCampaigns())
            .catch((err) => console.error("Błąd usuwania:", err));
    };

    return (
        <div>
            <CampaignForm
                onSuccess={() => {
                    fetchCampaigns();
                    setEditingCampaign(null);
                }}
                editingCampaign={editingCampaign}
                onCancelEdit={() => setEditingCampaign(null)}
            />
            <h2>Campaigns list: </h2>

            <ul>
                {campaigns.map((c) => (
                    <li key={c.id}>
                        <strong>{c.campaignName}</strong> - {c.keywords.join(", ")} ({c.town}) ,{" "}
                        BidAmount: {c.bidAmount} , Campaign Fund: {c.campaignFund} –{" "}
                        {c.status ? "ON" : "OFF"}, – {c.radius} km
                        <button onClick={() => handleDelete(c.id)} style={{ marginLeft: "10px" }}>
                            Delete
                        </button>
                        <button onClick={() => setEditingCampaign(c)} style={{ marginLeft: "10px" }}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampaignList;
