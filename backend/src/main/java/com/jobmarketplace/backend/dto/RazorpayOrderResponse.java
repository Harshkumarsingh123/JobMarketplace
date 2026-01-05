package com.jobmarketplace.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RazorpayOrderResponse {
    private String orderId;
    private double amount;
}
