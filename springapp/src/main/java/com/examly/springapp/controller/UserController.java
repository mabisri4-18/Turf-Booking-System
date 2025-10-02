package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.configuration.JWTUtil;
import com.examly.springapp.model.UserEntity;
import com.examly.springapp.service.UserService;

@RestController
@CrossOrigin(origins = "https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody UserEntity user) {
        userService.createUser(user);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Registered Successfully!");
        return ResponseEntity.ok(res);
    }

    // Get all users
    @GetMapping("/get")
    public List<UserEntity> getUser() {
        return userService.getUser();
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        UserEntity user = userService.authenticate(email, password);
        Map<String, String> res = new HashMap<>();

        if (user != null) {
            // Convert enum role to String
            String roleStr = user.getRole().name();

            // Generate JWT token using email and role string
            String token = JWTUtil.generateToken(user.getEmail(), roleStr);

            res.put("token", token);
            res.put("email", user.getEmail());
            res.put("name", user.getUsername());
            res.put("role", roleStr); // ADMIN / CUSTOMER / STAFF
            return ResponseEntity.ok(res);
        } else {
            res.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
    }
}
