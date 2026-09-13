package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminAccountResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminAccountService {

    private final AccountRepository accountRepository;

    public AdminAccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<AdminAccountResponse> getAllAccounts() {

        List<Account> accounts = accountRepository.findAll();

        return accounts.stream()
                .map(account -> new AdminAccountResponse(
                        account.getId(),
                        account.getAccountNumber(),
                        account.getAccountType(),
                        account.getStatus(),
                        account.getBalance(),
                        account.getCreatedAt(),
                        account.getUser().getId(),
                        account.getUser().getName(),
                        account.getUser().getEmail()
                ))
                .toList();
    }
}