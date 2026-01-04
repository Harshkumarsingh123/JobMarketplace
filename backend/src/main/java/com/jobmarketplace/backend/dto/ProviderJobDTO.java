package com.jobmarketplace.backend.dto;

import com.jobmarketplace.backend.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProviderJobDTO {
    private Job job;
    private long applicants;
}

