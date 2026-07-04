
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
// @CrossOrigin(origins = "http://localhost:8080/auth")
@CrossOrigin(origins = "http://localhost:3000")
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
            String roleStr = user.getRole().name(); // convert enum -> string
            String token = JWTUtil.generateToken(user.getEmail(), roleStr);

            res.put("token", token);
            res.put("email", user.getEmail());
            res.put("name", user.getUsername());
            res.put("role", roleStr); // ADMIN / CUSTOMER / STAFF
            return ResponseEntity.ok(res);
        } else {
            res.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
    }

    @DeleteMapping("/users/{id}")
public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
    boolean deleted = userService.deleteUserById(id); // implement this in UserService

    Map<String, String> res = new HashMap<>();
    if (deleted) {
        res.put("message", "User deleted successfully!");
        return ResponseEntity.ok(res);
    } else {
        res.put("error", "User not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }
}

    //  @GetMapping("/getProfile")
    // public ResponseEntity<UserEntity> getProfile(@AuthenticationPrincipal Jwt jwt) {
    // String email = jwt.getSubject(); // email from token
    // Optional<UserEntity> userOpt = userService.findByEmail(email);
    // return userOpt.map(ResponseEntity::ok)
    //               .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//}

}
