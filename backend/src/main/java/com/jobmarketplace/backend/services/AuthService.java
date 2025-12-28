package com.jobmarketplace.backend.services;

import com.jobmarketplace.backend.config.JwtUtil;
import com.jobmarketplace.backend.dto.LoginRequest;
import com.jobmarketplace.backend.dto.LoginResponse;
import com.jobmarketplace.backend.dto.SignupRequest;
import com.jobmarketplace.backend.entity.Role;
import com.jobmarketplace.backend.entity.User;
import com.jobmarketplace.backend.repository.RoleRepository;
import com.jobmarketplace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // ================= REGISTER =================
    public String registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email Already Registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String roleName = "ROLE_" + request.getRole();
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.getRoles().add(role);
        userRepository.save(user);

        return "User registered successfully";
    }

    // ================= LOGIN =================
    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        //  Extract role AFTER authentication
        String role = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");

        // Generate token WITH ROLE
        String token = jwtUtil.generateToken(
                request.getEmail(),
                role
        );

        return new LoginResponse(
                token,
                request.getEmail(),
                role
        );
    }
}
