package com.expensetracker.controller;

import com.expensetracker.dto.UserDTO;
import com.expensetracker.dto.UserRegistrationDTO;
import com.expensetracker.dto.UserLoginDTO;
import com.expensetracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        return ResponseEntity.ok(userService.registerUser(registrationDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@Valid @RequestBody UserLoginDTO loginDTO) {
        return ResponseEntity.ok(userService.loginUser(loginDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/theme")
    public ResponseEntity<UserDTO> updateTheme(@PathVariable Long id, @RequestParam String theme) {
        return ResponseEntity.ok(userService.updateTheme(id, theme));
    }

    @PutMapping("/{id}/avatar")
    public ResponseEntity<UserDTO> updateAvatar(@PathVariable Long id, @RequestParam String avatarUrl) {
        return ResponseEntity.ok(userService.updateAvatar(id, avatarUrl));
    }
} 