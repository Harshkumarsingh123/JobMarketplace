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

    // 🔔 notify job provider when someone applies
    public void notifyProviderOnApply(JobApplication app) {
        messagingTemplate.convertAndSend(
                "/topic/provider/" + app.getJobProviderEmail(),
                new NotificationMessage(
                        "APPLY",
                        "📩 New application for " + app.getJob().getTitle(),
                        app.getJob().getId()
                )
        );
    }

    // 🔔 notify job seeker on approve / reject
    public void send(JobApplication app, ApplicationStatus status) {

        String msg =
                status == ApplicationStatus.APPROVED
                        ? "🎉 Your application for '" + app.getJob().getTitle() + "' is APPROVED!"
                        : "❌ Your application for '" + app.getJob().getTitle() + "' was REJECTED.";

        messagingTemplate.convertAndSend(
                "/topic/seeker/" + app.getApplicantEmail(),
                new NotificationMessage(
                        status.name(),
                        msg,
                        app.getJob().getId()
                )
        );
    }
}
