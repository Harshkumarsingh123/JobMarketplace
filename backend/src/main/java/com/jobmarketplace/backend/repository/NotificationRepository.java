package com.jobmarketplace.backend.repository;

import com.jobmarketplace.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByUserEmailOrderByCreatedAtDesc(String email);
}
