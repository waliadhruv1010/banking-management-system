package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AccountResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountStatus;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountType;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.AccountNotFoundException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.UserNotFoundException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.AccountRepository;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository,
                          UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public List<AccountResponse> getMyAccounts() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        return accountRepository.findByUser(user)
                .stream()
                .map(account -> new AccountResponse(
                        account.getAccountNumber(),
                        account.getAccountType(),
                        account.getStatus(),
                        account.getBalance(),
                        account.getCreatedAt()
                ))
                .toList();
    }

    public AccountResponse createAccount(AccountType accountType) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        // Check if user already has this type of account
        List<Account> existingAccounts =
                accountRepository.findByUser(user);

        boolean alreadyExists = existingAccounts.stream()
                .anyMatch(account ->
                        account.getAccountType() == accountType
                );

        if (alreadyExists) {
            throw new RuntimeException(
                    "You already have a " + accountType + " account"
            );
        }

        Account account = new Account();

        account.setAccountNumber(
                (long) (1000000000L + Math.random() * 9000000000L)
        );

        account.setAccountType(accountType);
        account.setStatus(AccountStatus.ACTIVE);
        account.setBalance(BigDecimal.ZERO);

        account.setUser(user);

        Account savedAccount = accountRepository.save(account);

        return convertToResponse(savedAccount);
    }

    public void blockAccount(Long accountNumber) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException("Account Not found"));

        account.setStatus(AccountStatus.BLOCKED);

        accountRepository.save(account);
    }

    public void unblockAccount(Long accountNumber) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException("Account not found"));

        account.setStatus(AccountStatus.ACTIVE);

        accountRepository.save(account);
    }

    public void closeAccount(Long accountNumber) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException("Account Not found"));

        account.setStatus(AccountStatus.CLOSED);

        accountRepository.save(account);
    }

    public AccountResponse convertToResponse(Account account) {

        AccountResponse response = new AccountResponse();

        response.setAccountNumber(account.getAccountNumber());
        response.setAccountType(account.getAccountType());
        response.setStatus(account.getStatus());
        response.setBalance(account.getBalance());
        response.setCreatedAt(account.getCreatedAt());

        return response;
    }
}