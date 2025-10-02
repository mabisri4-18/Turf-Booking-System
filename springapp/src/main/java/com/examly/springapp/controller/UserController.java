// package com.examly.springapp.controller;

// import java.util.List;
// import org.springframework.http.ResponseEntity;
// import java.util.Map;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.examly.springapp.configuration.JWTUtil;
// import com.examly.springapp.model.UserEntity;
// import com.examly.springapp.service.UserService;

// @RestController
// @CrossOrigin(origins="https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
// @RequestMapping("/auth")
// public class UserController {

//     @Autowired
//     UserService userService;

//     @PostMapping("/register")
//     public String createUser(@RequestBody UserEntity user)
//     {
//         userService.createUser(user);
//         return "Register Successfully !!!!";
//     }
//     @GetMapping("/get")
//     public List<UserEntity> getUser()
//     {
//         return userService.getUser();
//     }
//     // @PostMapping("/login")
//     // public String login(@RequestParam String email,@RequestParam String password)
//     // {
//     //     UserEntity user = userService.authenticate(email,password);
//     //     if(user!=null)
//     //     {
//     //         String token = JWTUtil.generateToken(user.getEmail());
//     //         System.out.println("Generated JWT Token: "+token);
//     //         return "Logged in";
//     //     }
//     //     else
//     //     {
//     //         return "Invalid";
//     //     }
//     @PostMapping("/login")
//     public ResponseEntity<Map<String,String>> login(@RequestParam String email,@RequestParam String password)
//     {
//     UserEntity user = userService.authenticate(email,password);
//     if(user!=null)
//     {
//         String token = JWTUtil.generateToken(user.getEmail());
//         Map<String,String> res = new HashMap<>();
//         res.put("token", token);
//         res.put("email", user.getEmail());
//         return ResponseEntity.ok(res);
//     }
//     else
//     {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid credentials"));
//     }
//     }

// }
package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.configuration.JWTUtil;
import com.examly.springapp.model.UserEntity;
import com.examly.springapp.service.UserService;

@RestController
@CrossOrigin(origins = "https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody UserEntity user) {
        userService.createUser(user);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Registered Successfully!");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/get")
    public List<UserEntity> getUser() {
        return userService.getUser();
    }

    // @PostMapping("/login")
    // public ResponseEntity<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
    //     UserEntity user = userService.authenticate(email, password);
    //     Map<String, String> res = new HashMap<>();
    //     if (user != null) {
    //         String token = JWTUtil.generateToken(user.getEmail());
    //         res.put("token", token);
    //         res.put("email", user.getEmail());
    //         return ResponseEntity.ok(res);
    //     } else {
    //         res.put("error", "Invalid credentials");
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    //     }
    // }
    @PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");

    UserEntity user = userService.authenticate(email, password);
    Map<String, String> res = new HashMap<>();
    if (user != null) {
        String token = JWTUtil.generateToken(user.getEmail(),user.getRole());
        res.put("token", token);
        res.put("email", user.getEmail());
        res.put("role",user.getRole());
        return ResponseEntity.ok(res);
    } else {
        res.put("error", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }
}
}
