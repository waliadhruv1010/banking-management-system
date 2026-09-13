package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String name;
    private String email;
    private Role role;
}