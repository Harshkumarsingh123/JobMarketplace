package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByPostedByEmail(String email);

    List<Job> findByActiveTrueAndExpiresAtBefore(LocalDateTime time);

    List<Job> findByPostedByEmailOrderByCreatedAtDesc(String email);

    @Query(value = """
SELECT *
FROM jobs
WHERE (6371 * acos(
    cos(radians(:lat)) * cos(radians(latitude)) *
    cos(radians(longitude) - radians(:lng)) +
    sin(radians(:lat)) * sin(radians(latitude))
)) <= :radius
ORDER BY created_at DESC
""", nativeQuery = true)
    List<Job> findNearestJobs(
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("radius") double radius
    );

    @Query("""
SELECT j FROM Job j
WHERE j.active = true
AND j.id NOT IN (
   SELECT a.job.id FROM JobApplication a
   WHERE a.applicantEmail = :email
)
""")
    List<Job> findActiveJobsNotAppliedByUser(
            @Param("email") String email
    );

    @Query("""
SELECT j FROM Job j
WHERE j.active = true
AND j.expiresAt > CURRENT_TIMESTAMP
AND j.id NOT IN (
   SELECT a.job.id FROM JobApplication a
   WHERE a.applicantEmail = :email
)
ORDER BY j.createdAt DESC
""")
    List<Job> findVisibleJobsForSeeker(@Param("email") String email);

    @Query(value = """
SELECT *
FROM jobs j
WHERE j.active = true
AND j.expires_at > NOW()
AND j.id NOT IN (
    SELECT a.job_id
    FROM job_applications a
    WHERE a.applicant_email = :email
)
AND (
    6371 * acos(
        cos(radians(:lat)) * cos(radians(j.latitude)) *
        cos(radians(j.longitude) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(j.latitude))
    )
) <= :radius
ORDER BY j.created_at DESC
""", nativeQuery = true)
    List<Job> findNearbyVisibleJobsForSeeker(
            @Param("email") String email,
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("radius") double radius
    );



}
