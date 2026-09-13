package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminTransactionResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminTransactionService {

    private final TransactionRepository transactionRepository;

    public AdminTransactionService(
            TransactionRepository transactionRepository) {

        this.transactionRepository = transactionRepository;
    }

    public List<AdminTransactionResponse> getAllTransactions() {

        return transactionRepository.findAll()
                .stream()
                .map(transaction -> new AdminTransactionResponse(
                        transaction.getId(),
                        transaction.getType(),
                        transaction.getAmount(),
                        transaction.getBalanceAfter(),
                        transaction.getDescription(),
                        transaction.getCreatedAt(),
                        transaction.getAccount().getAccountNumber(),
                        transaction.getAccount().getUser().getId(),
                        transaction.getAccount().getUser().getName(),
                        transaction.getAccount().getUser().getEmail()
                ))
                .toList();
    }
}