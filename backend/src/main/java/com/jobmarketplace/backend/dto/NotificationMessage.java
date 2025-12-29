package com.jobmarketplace.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage {

    private String type;     // APPLY / APPROVED / REJECTED
    private String message;
    private Long jobId;
}
