package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.JobApplication;
import com.jobmarketplace.backend.services.JobApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService applicationService;
    private final JwtUtil jwtUtil;

    private String extractEmail(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        return jwtUtil.extractEmail(auth.substring(7));
    }

    // APPLY
    @PostMapping("/apply/{jobId}")
    public void applyJob(@PathVariable Long jobId,
                         HttpServletRequest request) {

        applicationService.applyForJob(jobId, extractEmail(request));
    }

    // JOB SEEKER
    @GetMapping("/my")
    public List<JobApplication> myApplications(HttpServletRequest request) {
        return applicationService.myApplications(extractEmail(request));
    }

    // JOB PROVIDER
    @GetMapping("/received")
    public List<JobApplication> receivedApplications(HttpServletRequest request) {
        return applicationService.receivedApplications(extractEmail(request));
    }

    // APPROVE / REJECT
    @PatchMapping("/{id}/status")
    public void updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {
        applicationService.updateStatus(id, status);
    }
}
