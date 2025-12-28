package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.dto.ProfileRequest;
import com.jobmarketplace.backend.entity.User;
import com.jobmarketplace.backend.entity.UserProfile;
import com.jobmarketplace.backend.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserProfileRepository profileRepository;

    public UserProfile saveOrUpdateProfile(User user, ProfileRequest request) {

        UserProfile profile = profileRepository
                .findByUser(user)
                .orElse(new UserProfile());

        profile.setUser(user);
        profile.setAge(request.getAge());
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setStatus(request.getStatus());
        profile.setSkills(request.getSkills());
        profile.setAbout(request.getAbout());

        return profileRepository.save(profile);
    }

    public UserProfile getProfile(User user) {
        return profileRepository.findByUser(user).orElse(null);
    }
}
