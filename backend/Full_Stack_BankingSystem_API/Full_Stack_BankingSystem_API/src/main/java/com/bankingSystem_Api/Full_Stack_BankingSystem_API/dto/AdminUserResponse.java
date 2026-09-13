package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}