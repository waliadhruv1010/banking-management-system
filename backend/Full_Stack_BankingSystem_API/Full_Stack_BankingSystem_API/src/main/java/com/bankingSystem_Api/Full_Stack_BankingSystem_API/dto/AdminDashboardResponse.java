package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalUsers;

    private long totalAccounts;

    private long activeAccounts;

    private long blockedAccounts;
}