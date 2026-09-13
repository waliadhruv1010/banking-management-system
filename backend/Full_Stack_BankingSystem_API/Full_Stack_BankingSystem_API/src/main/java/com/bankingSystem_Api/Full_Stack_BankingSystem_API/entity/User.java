package com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonIgnore
    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;


    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt=LocalDateTime.now();
    }

    @OneToMany(mappedBy = "user")
    private List<Account> accounts;
}
