import axios from "axios";

const API_URL = "http://localhost:8080/api/campaigns";

export const getAllCampaigns = () => axios.get(API_URL);
export const getCampaignById = (id) => axios.get(`${API_URL}/${id}`);
export const createCampaign = (campaign) => axios.post(API_URL, campaign);
export const updateCampaign = (id, campaign) => axios.put(`${API_URL}/${id}`, campaign);
export const deleteCampaign = (id) => axios.delete(`${API_URL}/${id}`);
