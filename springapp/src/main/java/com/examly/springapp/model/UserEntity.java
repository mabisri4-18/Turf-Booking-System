package com.examly.springapp.model;


import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    private String username;
    private String email;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;   

    public enum Role {
        ADMIN, CUSTOMER, STAFF
    }
}
