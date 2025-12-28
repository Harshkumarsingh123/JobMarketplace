package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.dto.JobRequest;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public Job createJob(String email, JobRequest request) {

        // Combine date + time into LocalDateTime
        LocalDate startDate = LocalDate.parse(request.getStartDate());
        LocalTime startTime = LocalTime.parse(request.getStartTime());
        LocalDateTime startDateTime = LocalDateTime.of(startDate, startTime);

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
                .createdAt(LocalDateTime.now())
                .build();

        return jobRepository.save(job);
    }

    public List<Job> getMyJobs(String email) {
        return jobRepository.findByPostedByEmail(email);
    }
}
