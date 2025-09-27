package com.examly.springapp.controller;

import java.util.List;

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
@CrossOrigin(origins="https://8081-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io")
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public String createUser(@RequestBody UserEntity user)
    {
        userService.createUser(user);
        return "Register Successfully !!!!";
    }
    @GetMapping("/get")
    public List<UserEntity> getUser()
    {
        return userService.getUser();
    }
    @PostMapping("/login")
    public String login(@RequestParam String email,@RequestParam String password)
    {
        UserEntity user = userService.authenticate(email,password);
        if(user!=null)
        {
            String token = JWTUtil.generateToken(user.getEmail());
            System.out.println("Generated JWT Token: "+token);
            return "Logged in";
        }
        else
        {
            return "Invalid";
        }
    }
}
