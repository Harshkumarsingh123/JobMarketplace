package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.dto.JobRequest;
import com.jobmarketplace.backend.dto.ProviderJobDTO;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.entity.JobApplication;
import com.jobmarketplace.backend.repository.JobApplicationRepository;
import com.jobmarketplace.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;


    public Job createJob(String email, JobRequest request) {

        // Combine date + time into LocalDateTime
        LocalDate startDate = LocalDate.parse(request.getStartDate());
        LocalTime startTime = LocalTime.parse(request.getStartTime());
        LocalDateTime startDateTime = LocalDateTime.of(startDate, startTime);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusHours(48);

        // optional end time
        LocalTime endTime = null;
        if (request.getEndTime() != null && !request.getEndTime().isEmpty()) {
            endTime = LocalTime.parse(request.getEndTime());
        }

        Job job = Job.builder()
                .title(request.getTitle())
                .location(request.getLocation())
                .latitude(request.getLat())
                .longitude(request.getLng())
                .address(request.getAddress())
                .hours(request.getHours())
                .pay(request.getPay())
                .type(request.getType())
                .postedByEmail(email)
                .startDateTime(startDateTime)
                .endTime(endTime)
                .createdAt(now)
                .expiresAt(expiresAt)
                .active(true)
                .build();

        return jobRepository.save(job);
    }

    public List<Job> getMyJobs(String email) {
        return jobRepository.findByPostedByEmailOrderByCreatedAtDesc(email);
    }

    public List<Job> getNearestJobs(double lat, double lng) {
        double DEFAULT_RADIUS = 5.0; // 5 KM
        return jobRepository.findNearestJobs(lat, lng, DEFAULT_RADIUS);
    }

    public List<Job> getNearestJobsForSeeker(String email) {
        return jobRepository.findActiveJobsNotAppliedByUser(email);
    }

    public List<Job> getJobsForSeeker(String email) {
        return jobRepository.findVisibleJobsForSeeker(email);
    }

    public List<Job> getNearbyJobsForSeeker(
            String email,
            double lat,
            double lng
    ) {
        double RADIUS_KM = 20.0;
        return jobRepository.findNearbyVisibleJobsForSeeker(
                email, lat, lng, RADIUS_KM
        );
    }

    public List<ProviderJobDTO> getMyJobsWithApplicants(String email) {

        List<Job> jobs =
                jobRepository.findByPostedByEmailOrderByCreatedAtDesc(email);

        return jobs.stream()
                .map(job -> new ProviderJobDTO(
                        job,
                        applicationRepository.countByJobId(job.getId())
                ))
                .toList();
    }



}
