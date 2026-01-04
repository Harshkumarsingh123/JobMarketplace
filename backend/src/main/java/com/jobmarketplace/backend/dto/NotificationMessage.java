package com.jobmarketplace.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage {

    private String type;     // APPLY / APPROVED / REJECTED
    private String message;
    private Long jobId;
}
