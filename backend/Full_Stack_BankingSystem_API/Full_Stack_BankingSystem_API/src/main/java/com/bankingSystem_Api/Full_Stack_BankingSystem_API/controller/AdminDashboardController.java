package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminDashboardResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(
            AdminDashboardService adminDashboardService) {

        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        AdminDashboardResponse response =
                adminDashboardService.getDashboardStats();

        return ResponseEntity.ok(response);
    }
}