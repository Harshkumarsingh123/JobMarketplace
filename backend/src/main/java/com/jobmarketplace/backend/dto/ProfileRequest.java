package com.jobmarketplace.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequest {

    private Integer age;
    private String phone;
    private String address;
    private String city;
    private String status;
    private String skills;
    private String about;
    private Double latitude;
    private Double longitude;
}
