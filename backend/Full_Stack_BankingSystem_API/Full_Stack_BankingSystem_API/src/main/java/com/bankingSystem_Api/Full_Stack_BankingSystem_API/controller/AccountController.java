package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AccountResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ApiResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountType;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {

        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@RequestParam AccountType accountType) {

        AccountResponse accountResponse = accountService.createAccount(accountType);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(accountResponse);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getMyAccounts() {

        List<AccountResponse> accounts =
                accountService.getMyAccounts();

        ApiResponse<List<AccountResponse>> response =
                new ApiResponse<>(
                        true,
                        "Accounts fetched successfully",
                        accounts
                );

        return ResponseEntity.ok(response);
    }
}
