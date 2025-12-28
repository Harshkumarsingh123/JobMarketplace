package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.dto.ProfileRequest;
import com.jobmarketplace.backend.entity.User;
import com.jobmarketplace.backend.entity.UserProfile;
import com.jobmarketplace.backend.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public UserProfile saveProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileRequest request) {

        User user = (User) userDetails; // we’ll adjust when JWT added
        return profileService.saveOrUpdateProfile(user, request);
    }

    @GetMapping
    public UserProfile getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = (User) userDetails;
        return profileService.getProfile(user);
    }
}
