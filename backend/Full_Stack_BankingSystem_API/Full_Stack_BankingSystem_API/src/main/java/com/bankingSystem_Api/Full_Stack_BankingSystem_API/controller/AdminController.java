package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminAccountResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminTransactionResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminUserResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AccountService;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AdminAccountService;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AdminTransactionService;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AdminUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AccountService accountService;
    private final AdminUserService adminUserService;
    private final AdminAccountService adminAccountService;
    private final AdminTransactionService adminTransactionService;
    public AdminController(
            AccountService accountService,
            AdminUserService adminUserService,
            AdminAccountService adminAccountService, AdminTransactionService adminTransactionService) {

        this.accountService = accountService;
        this.adminUserService = adminUserService;
        this.adminAccountService = adminAccountService;
        this.adminTransactionService = adminTransactionService;
    }

    // ==============================
    // ADMIN TEST
    // ==============================

    @GetMapping("/test")
    public String adminTest() {
        return "Admin access granted";
    }

    // ==============================
    // ALL USERS
    // ==============================

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    // ==============================
    // ALL ACCOUNTS
    // ==============================

    @GetMapping("/accounts")
    public List<AdminAccountResponse> getAllAccounts() {
        return adminAccountService.getAllAccounts();
    }

    @GetMapping("/transactions")
    public List<AdminTransactionResponse> getAllTransactions() {

        return adminTransactionService.getAllTransactions();
    }

    // ==============================
    // BLOCK ACCOUNT
    // ==============================

    @PutMapping("/accounts/{accountNumber}/block")
    public String accountBlock(
            @PathVariable Long accountNumber) {

        accountService.blockAccount(accountNumber);

        return "Account blocked successfully";
    }

    // ==============================
    // UNBLOCK ACCOUNT
    // ==============================

    @PutMapping("/accounts/{accountNumber}/unblock")
    public String accountUnblock(
            @PathVariable Long accountNumber) {

        accountService.unblockAccount(accountNumber);

        return "Account unblocked successfully";
    }

    // ==============================
    // CLOSE ACCOUNT
    // ==============================

    @PutMapping("/accounts/{accountNumber}/close")
    public String accountClose(
            @PathVariable Long accountNumber) {

        accountService.closeAccount(accountNumber);

        return "Account Closed successfully";
    }
}