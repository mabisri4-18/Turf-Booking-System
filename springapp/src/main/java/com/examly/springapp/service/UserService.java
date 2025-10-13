package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.UserEntity;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register user
    public void createUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set default role if none provided
        if (user.getRole() == null) {
            user.setRole(UserEntity.Role.CUSTOMER); 
        }

        userRepository.save(user);
    }

    // Get all users
    public List<UserEntity> getUser() {
        return userRepository.findAll();
    }

    // Authenticate login
    public UserEntity authenticate(String email, String password) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null; // invalid credentials
    }

    public boolean deleteUserById(Long id) {
    if(userRepository.existsById(id)) {
        userRepository.deleteById(id);
        return true;
    }
    return false;
}
//      public Optional<UserEntity> findByEmail(String email) {
//     return userRepository.findByEmail(email);
//    }

}
