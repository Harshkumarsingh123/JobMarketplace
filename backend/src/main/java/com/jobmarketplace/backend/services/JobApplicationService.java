package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.Job;
import com.jobmarketplace.backend.entity.JobApplication;
import com.jobmarketplace.backend.entity.Profile;
import com.jobmarketplace.backend.repository.JobApplicationRepository;
import com.jobmarketplace.backend.repository.JobRepository;
import com.jobmarketplace.backend.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final ProfileRepository profileRepository;

    public void applyForJob(Long jobId, String applicantEmail) {

        if (applicationRepository.existsByJobIdAndApplicantEmail(jobId, applicantEmail)) {
            throw new RuntimeException("Already applied");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Profile profile = profileRepository.findByEmail(applicantEmail)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        JobApplication application = JobApplication.builder()
                .job(job)
                .applicantEmail(applicantEmail)
                .applicantName(profile.getName())
                .applicantPhone(profile.getPhone())
                .applicantSkills(profile.getSkills())
                .jobProviderEmail(job.getPostedByEmail())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        applicationRepository.save(application);
    }

    public List<JobApplication> myApplications(String email) {
        return applicationRepository.findByApplicantEmailOrderByAppliedAtDesc(email);
    }

    public List<JobApplication> receivedApplications(String email) {
        return applicationRepository.findByJobProviderEmailOrderByAppliedAtDesc(email);
    }

    public void updateStatus(Long id, ApplicationStatus status) {
        JobApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        applicationRepository.save(app);
    }
}
