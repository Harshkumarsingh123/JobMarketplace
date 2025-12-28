package com.jobmarketplace.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final String PROFILE_UPLOAD_DIR =
            "C:/job-marketplace/uploads/profile/";

    public String saveProfilePhoto(MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("Photo file is empty");
        }

        Path uploadPath = Paths.get(PROFILE_UPLOAD_DIR);

        // Ensure directory exists
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Save file
        file.transferTo(filePath.toFile());

        // Return DB-safe relative path
        return "uploads/profile/" + fileName;
    }
}
