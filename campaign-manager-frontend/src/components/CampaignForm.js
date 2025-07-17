import React, { useEffect, useState } from "react";
import { createCampaign, updateCampaign } from "../api/campaignService";

const CampaignForm = ({ onSuccess, editingCampaign, onCancelEdit }) => {
    const [form, setForm] = useState({
        campaignName: "",
        keywords: "",
        bidAmount: 1.0,
        campaignFund: 0.0,
        status: true,
        town: "Warszawa",
        radius: 5.0,
    });

    useEffect(() => {
        if (editingCampaign) {
            setForm({
                ...editingCampaign,
                keywords: editingCampaign.keywords.join(", "),
            });
        }
    }, [editingCampaign]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? e.target.checked : value;
        setForm((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            keywords: form.keywords.split(",").map((kw) => kw.trim()),
        };

        const action = editingCampaign
            ? updateCampaign(editingCampaign.id, payload)
            : createCampaign(payload);

        action
            .then(() => {
                onSuccess();
                setForm({
                    campaignName: "",
                    keywords: "",
                    bidAmount: 1.0,
                    campaignFund: 0.0,
                    status: true,
                    town: "Warszawa",
                    radius: 5.0,
                });
            })
            .catch((err) => console.error("Błąd:", err));
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                {editingCampaign ? "Edit campaign" : "Campaign Manager"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                    <label>Campaign name: </label>
                    <input name="campaignName" value={form.campaignName} onChange={handleChange} required />
                </div>

                <div>
                    <label> Keyword (separated by ,): </label>
                    <input name="keywords" value={form.keywords} onChange={handleChange} required />
                </div>

                <div>
                    <label>Bid Amount: </label>
                    <input name="bidAmount" type="number" step="0.1" min="1" value={form.bidAmount} onChange={handleChange} required />
                </div>

                <div>
                    <label>Campaign Fund:</label>
                    <input name="campaignFund" type="number" step="0.1" value={form.campaignFund} onChange={handleChange} required />
                </div>

                <div>
                    <label>City: </label>
                    <select name="town" value={form.town} onChange={handleChange}>
                        <option value="Warszawa">Warszawa</option>
                        <option value="Kraków">Kraków</option>
                        <option value="Kielce">Kielce</option>
                        <option value="Poznań">Poznań</option>
                        <option value="Łódź">Łódź</option>
                        <option value="Lublin">Lublin</option>
                        <option value="Białystok">Białystok</option>
                        <option value="Zielona Góra">Zielona Góra</option>
                    </select>
                </div>

                <div>
                    <label> Radius (in km): </label>
                    <input name="radius" type="number" min="0.1" step="0.1" value={form.radius} onChange={handleChange} required />
                </div>

                <div>
                    <label>
                        <input name="status" type="checkbox" checked={form.status} onChange={handleChange} />
                        Campaign on
                    </label>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        {editingCampaign ? "Save changes" : "Add campaign"}
                    </button>

                    {editingCampaign && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            style={{ flex: 1, padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Cancel changes
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CampaignForm;
