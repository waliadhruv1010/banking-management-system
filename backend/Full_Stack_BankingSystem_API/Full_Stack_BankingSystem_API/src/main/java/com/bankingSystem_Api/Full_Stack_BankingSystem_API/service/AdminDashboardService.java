package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminDashboardResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountStatus;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.AccountRepository;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public AdminDashboardService(
            UserRepository userRepository,
            AccountRepository accountRepository) {

        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    public AdminDashboardResponse getDashboardStats() {

        // Total number of registered users
        long totalUsers = userRepository.count();

        // Get all accounts
        List<Account> accounts = accountRepository.findAll();

        // Total number of accounts
        long totalAccounts = accounts.size();

        // Count ACTIVE accounts
        long activeAccounts = accounts.stream()
                .filter(account ->
                        account.getStatus() == AccountStatus.ACTIVE)
                .count();

        // Count BLOCKED accounts
        long blockedAccounts = accounts.stream()
                .filter(account ->
                        account.getStatus() == AccountStatus.BLOCKED)
                .count();

        return new AdminDashboardResponse(
                totalUsers,
                totalAccounts,
                activeAccounts,
                blockedAccounts
        );
    }
}