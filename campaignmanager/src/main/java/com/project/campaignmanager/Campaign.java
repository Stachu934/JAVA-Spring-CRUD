package com.project.campaignmanager;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;
import lombok.Data;

@Data
@Entity
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Campaign name is mandatory")
    @Pattern(regexp = "^[\\p{L}\\s'-]+$", message = "Campaign name must contain only letters, spaces, hyphens or apostrophes, no numbers")
    @Column(nullable = false)
    private String campaignName;

    @NotNull(message = "Keywords cannot be null")
    @Size(min = 1, message = "At least one keyword is required")
    @ElementCollection
    @CollectionTable(name = "campaign_keywords", joinColumns = @JoinColumn(name = "campaign_id"))
    @Column(name = "keyword")
    private List<
            @Pattern(
                    regexp = "^[\\p{L}\\s'-]+$",
                    message = "Each keyword must contain only letters, spaces, hyphens or apostrophes, no numbers"
            )
                    String> keywords;

    @NotNull(message = "Bid amount is mandatory")
    @DecimalMin(value = "0.01", message = "Bid amount must be greater than zero")
    @Column(nullable = false)
    private Double bidAmount;

    @NotNull(message = "Campaign fund is mandatory")
    @DecimalMin(value = "0.0", inclusive = false, message = "Campaign fund must be positive")
    @Column(nullable = false)
    private Double campaignFund;

    @NotNull(message = "Status is mandatory")
    @Column(nullable = false)
    private Boolean status;

    @NotBlank(message = "Town is mandatory")
    @Column(nullable = false)
    private String town;

    @NotNull(message = "Radius is mandatory")
    @DecimalMin(value = "0.1", message = "Radius must be at least 0.1 km")
    @Column(nullable = false)
    private Double radius;
}
