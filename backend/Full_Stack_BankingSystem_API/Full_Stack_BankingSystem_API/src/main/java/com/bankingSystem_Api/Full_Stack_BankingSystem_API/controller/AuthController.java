package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ApiResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.LoginRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.RegisterRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> userRegistration(
            @Valid @RequestBody RegisterRequest registerRequest) {

        userService.registerUser(registerRequest);

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "User registered successfully",
                null
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> userLogin(
            @Valid @RequestBody LoginRequest loginRequest) {

        String token = userService.loginUser(loginRequest);

        ApiResponse<String> response = new ApiResponse<>(
                true,
                "Login successful",
                token
        );

        return ResponseEntity.ok(response);
    }
}