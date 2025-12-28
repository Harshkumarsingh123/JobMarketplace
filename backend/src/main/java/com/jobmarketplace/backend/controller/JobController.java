package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.dto.JobRequest;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.services.JobService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JwtUtil jwtUtil;

    private String extractEmail(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }
        return jwtUtil.extractEmail(auth.substring(7));
    }

    // Only JOB_PROVIDER can post jobs
    @PreAuthorize("hasAuthority('ROLE_JOB_PROVIDER')")
    @PostMapping
    public Job postJob(
            HttpServletRequest request,
            @RequestBody JobRequest jobRequest
    ) {
        return jobService.createJob(extractEmail(request), jobRequest);
    }

    // View own jobs
    @PreAuthorize("hasAuthority('ROLE_JOB_PROVIDER')")
    @GetMapping("/my")
    public List<Job> getMyJobs(HttpServletRequest request) {
        return jobService.getMyJobs(extractEmail(request));
    }
}
