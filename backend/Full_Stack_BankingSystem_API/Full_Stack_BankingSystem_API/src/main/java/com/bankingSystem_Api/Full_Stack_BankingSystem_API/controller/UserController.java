package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ApiResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ChangePasswordRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.UserResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyProfile() {

        UserResponse userResponse =
                userService.getMyProfile();

        ApiResponse<UserResponse> response =
                new ApiResponse<>(
                        true,
                        "User profile fetched successfully",
                        userResponse
                );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        true,
                        "Password changed successfully",
                        null
                );

        return ResponseEntity.ok(response);
    }
}