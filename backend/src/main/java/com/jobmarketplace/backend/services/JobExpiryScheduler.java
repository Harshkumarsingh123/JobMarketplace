package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.entity.JobApplication;
import com.jobmarketplace.backend.repository.JobApplicationRepository;
import com.jobmarketplace.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class JobExpiryScheduler {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    @Scheduled(fixedRate = 60 * 60 * 1000) // every 1 hour
    public void expireJobs() {

        LocalDateTime now = LocalDateTime.now();

        List<Job> expiredJobs =
                jobRepository.findByActiveTrueAndExpiresAtBefore(now);

        for (Job job : expiredJobs) {
            job.setActive(false);
            jobRepository.save(job);

            // expire all pending applications
            List<JobApplication> apps =
                    applicationRepository.findByJobIdAndStatus(
                            job.getId(),
                            ApplicationStatus.PENDING
                    );

            for (JobApplication app : apps) {
                app.setStatus(ApplicationStatus.EXPIRED);
            }

            applicationRepository.saveAll(apps);
        }
    }
}


