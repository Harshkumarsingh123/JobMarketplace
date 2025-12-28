package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByPostedByEmail(String email);
}
