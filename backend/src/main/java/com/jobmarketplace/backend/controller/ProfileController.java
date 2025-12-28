package com.jobmarketplace.backend.controller;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.entity.Profile;
import com.jobmarketplace.backend.services.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final JwtUtil jwtUtil;

    private String extractEmail(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        return jwtUtil.extractEmail(authHeader.substring(7));
    }

    // GET PROFILE
    @GetMapping
    public Profile getProfile(HttpServletRequest request) {
        return profileService.getProfile(extractEmail(request));
    }

    // CREATE PROFILE
    @PostMapping
    public Profile saveProfile(
            HttpServletRequest request,
            @RequestBody Profile profile
    ) {
        return profileService.saveProfile(extractEmail(request), profile);
    }

    // UPDATE PROFILE
    @PutMapping
    public Profile updateProfile(
            HttpServletRequest request,
            @RequestBody Profile profile
    ) {
        return profileService.updateProfile(extractEmail(request), profile);
    }

    // UPLOAD PROFILE PHOTO
    @PostMapping(
            value = "/upload-photo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Profile uploadPhoto(
            HttpServletRequest request,
            @RequestParam("photo") MultipartFile photo
    ) throws Exception {

        if (photo == null || photo.isEmpty()) {
            throw new RuntimeException("Photo file is missing");
        }

        return profileService.uploadProfilePhoto(extractEmail(request), photo);
    }
}
