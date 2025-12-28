package com.jobmarketplace.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private static final String PROFILE_DIR =
            "C:/job-marketplace/uploads/profile/";

    @GetMapping("/profile/{filename}")
    public ResponseEntity<Resource> getProfileImage(
            @PathVariable String filename
    ) throws Exception {

        Path path = Paths.get(PROFILE_DIR).resolve(filename);
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}
