package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.entity.Notification;
import com.jobmarketplace.backend.repository.NotificationRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository repo;
    private final JwtUtil jwtUtil;

    @GetMapping
    public List<Notification> myNotifications(HttpServletRequest req) {
        String email = jwtUtil.extractEmail(req.getHeader("Authorization").substring(7));
        return repo.findByUserEmailOrderByCreatedAtDesc(email);
    }
}
