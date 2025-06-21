package com.expensetracker.service;

import com.expensetracker.dto.UserDTO;
import com.expensetracker.dto.UserRegistrationDTO;
import com.expensetracker.dto.UserLoginDTO;
import com.expensetracker.model.User;

public interface UserService {
    UserDTO registerUser(UserRegistrationDTO registrationDTO);
    UserDTO loginUser(UserLoginDTO loginDTO);
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO updateTheme(Long id, String theme);
    UserDTO updateAvatar(Long id, String avatarUrl);
    User getEntityById(Long id);
} 