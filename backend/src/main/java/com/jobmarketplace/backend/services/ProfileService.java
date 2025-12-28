package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.entity.Profile;
import com.jobmarketplace.backend.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final FileStorageService fileStorageService;

    public Profile getProfile(String email) {
        return profileRepository.findByEmail(email)
                .orElse(Profile.builder()
                        .email(email)
                        .build());
    }

    public Profile saveProfile(String email, Profile request) {

        Profile profile = profileRepository.findByEmail(email)
                .orElse(new Profile());

        profile.setEmail(email);
        profile.setName(request.getName());
        profile.setAge(request.getAge());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setStatus(request.getStatus());
        profile.setSkills(request.getSkills());
        profile.setAbout(request.getAbout());

        return profileRepository.save(profile);
    }

    public Profile uploadProfilePhoto(String email, MultipartFile photo) throws Exception {

        Profile profile = profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        String photoPath = fileStorageService.saveProfilePhoto(photo);
        profile.setPhotoPath(photoPath);

        return profileRepository.save(profile);
    }

    public Profile updateProfile(String email, Profile updatedProfile) {

        Profile existing = profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        existing.setName(updatedProfile.getName());
        existing.setAge(updatedProfile.getAge());
        existing.setPhone(updatedProfile.getPhone());
        existing.setAddress(updatedProfile.getAddress());
        existing.setCity(updatedProfile.getCity());
        existing.setStatus(updatedProfile.getStatus());
        existing.setSkills(updatedProfile.getSkills());
        existing.setAbout(updatedProfile.getAbout());

        // email, id, photoPath NOT changed here

        return profileRepository.save(existing);
    }

}

