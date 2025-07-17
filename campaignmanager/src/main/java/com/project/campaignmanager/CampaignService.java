package com.project.campaignmanager;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaign(Long id, Campaign campaignDetails) {
        return campaignRepository.findById(id).map(campaign -> {
            campaign.setCampaignName(campaignDetails.getCampaignName());
            campaign.setKeywords(campaignDetails.getKeywords());
            campaign.setBidAmount(campaignDetails.getBidAmount());
            campaign.setCampaignFund(campaignDetails.getCampaignFund());
            campaign.setStatus(campaignDetails.getStatus());
            campaign.setTown(campaignDetails.getTown());
            campaign.setRadius(campaignDetails.getRadius());
            return campaignRepository.save(campaign);
        }).orElseThrow(() -> new RuntimeException("Campaign not found"));
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }
}
