package com.expensetracker.service.impl;

import com.expensetracker.dto.UserDTO;
import com.expensetracker.dto.UserRegistrationDTO;
import com.expensetracker.dto.UserLoginDTO;
import com.expensetracker.dto.LoginResponseDTO;
import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import com.expensetracker.service.UserService;
import com.expensetracker.config.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public UserDTO registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(registrationDTO.getName());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setThemePreference("dark");

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    @Override
    public LoginResponseDTO loginUser(UserLoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(createUserDetails(user));
        
        return new LoginResponseDTO(token, convertToDTO(user));
    }

    private org.springframework.security.core.userdetails.UserDetails createUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = getEntityById(id);
        return convertToDTO(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = getEntityById(id);
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setAvatarUrl(userDTO.getAvatarUrl());
        user.setThemePreference(userDTO.getThemePreference());

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO updateTheme(Long id, String theme) {
        User user = getEntityById(id);
        user.setThemePreference(theme);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public UserDTO updateAvatar(Long id, String avatarUrl) {
        User user = getEntityById(id);
        user.setAvatarUrl(avatarUrl);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public User getEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setThemePreference(user.getThemePreference());
        return dto;
    }
} 