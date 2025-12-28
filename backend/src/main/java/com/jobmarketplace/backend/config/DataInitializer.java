package com.jobmarketplace.backend.config;

import com.jobmarketplace.backend.entity.Role;
import com.jobmarketplace.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;

    @Bean
    CommandLineRunner initRoles() {
        return args -> {

            if (roleRepository.findByName("ROLE_JOB_SEEKER").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_JOB_SEEKER"));
            }

            if (roleRepository.findByName("ROLE_JOB_PROVIDER").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_JOB_PROVIDER"));
            }

            if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_ADMIN"));
            }
        };
    }
}

