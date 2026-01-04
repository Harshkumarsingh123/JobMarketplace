package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.JobApplication;
import com.jobmarketplace.backend.entity.Notification;
import com.jobmarketplace.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    public void send(JobApplication app, ApplicationStatus status) {

        String msg =
                status == ApplicationStatus.APPROVED
                        ? "🎉 Your application for '" + app.getJob().getTitle() + "' is APPROVED!"
                        : "❌ Your application for '" + app.getJob().getTitle() + "' was REJECTED.";

        Notification notification = new Notification();
        notification.setUserEmail(app.getApplicantEmail());
        notification.setMessage(msg);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        repository.save(notification);
    }
}
