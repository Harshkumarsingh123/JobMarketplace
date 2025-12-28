package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByPostedByEmail(String email);

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


}
