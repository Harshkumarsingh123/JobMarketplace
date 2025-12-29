package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByApplicantEmailOrderByAppliedAtDesc(String email);

    List<JobApplication> findByJobProviderEmailOrderByAppliedAtDesc(String email);

    boolean existsByJobIdAndApplicantEmail(Long jobId, String email);
}
