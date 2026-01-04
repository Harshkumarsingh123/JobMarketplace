package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.dto.NotificationMessage;
import com.jobmarketplace.backend.entity.ApplicationStatus;
import com.jobmarketplace.backend.entity.JobApplication;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketNotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public void send(JobApplication app, ApplicationStatus status) {

        NotificationMessage msg = new NotificationMessage(
                status.name(),
                status == ApplicationStatus.APPROVED
                        ? "🎉 Your application for '" + app.getJob().getTitle() + "' is APPROVED!"
                        : "❌ Your application for '" + app.getJob().getTitle() + "' was REJECTED.",
                app.getJob().getId()
        );

        messagingTemplate.convertAndSendToUser(
                app.getApplicantEmail(),
                "/queue/notifications",
                msg
        );
    }

    public void notifyProviderOnApply(JobApplication app) {
        messagingTemplate.convertAndSendToUser(
                app.getJobProviderEmail(),
                "/queue/notifications",
                new NotificationMessage(
                        "APPLY",
                        "📥 New application for '" + app.getJob().getTitle() + "'",
                        app.getJob().getId()
                )
        );
    }
}
