package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.UserEntity;
import com.examly.springapp.repository.UserRepository;


@Service
public class UserService{

    @Autowired 
    UserRepository userRepository;

    @Autowired
    PasswordEncoder coder;

    public void createUser(UserEntity user) {
        user.setPassword(coder.encode(user.getPassword()));
        if(user.getRole() == null || user.getRole().isEmpty()) 
        {
        user.setRole("USER"); // default role
        }
        userRepository.save(user);
    }

    public List<UserEntity> getUser() {
        return userRepository.findAll();
    }

    public UserEntity authenticate(String email,String password)
    {
        return userRepository.findByEmail(email).filter(user->coder.matches(password,user.getPassword())).orElse(null);
    }
}
