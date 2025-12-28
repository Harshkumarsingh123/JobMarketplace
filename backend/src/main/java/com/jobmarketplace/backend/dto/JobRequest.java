package com.jobmarketplace.backend.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class JobRequest {

    private String title;
    private String location;
    private Double lat;
    private Double lng;
    private String hours;
    private String pay;
    private String type;
    private String address;
    private String startDate; // yyyy-MM-dd
    private String startTime; // HH:mm
    private String endTime;   // HH:mm (optional)

}
