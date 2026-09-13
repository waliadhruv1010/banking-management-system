package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ApiResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.DepositRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.TransactionResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.TransferRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.WithdrawRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.TransactionService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<ApiResponse<Void>> deposit(
            @PathVariable Long accountNumber,
            @Valid @RequestBody DepositRequest request) {

        transactionService.deposit(accountNumber, request.getAmount());

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Amount deposited successfully",
                null
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{accountNumber}/withdraw")
    public ResponseEntity<ApiResponse<Void>> withdraw(
            @PathVariable Long accountNumber,
            @Valid @RequestBody WithdrawRequest request) {

        transactionService.withdraw(accountNumber, request.getAmount());

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Amount withdrawn successfully",
                null
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{accountNumber}/history")
    public ResponseEntity<ApiResponse<Page<TransactionResponse>>> transactionHistory(
            @PathVariable Long accountNumber,
            @RequestParam int page,
            @RequestParam int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<TransactionResponse> transactions =
                transactionService.getTransactionHistory(
                        accountNumber,
                        pageable
                );

        ApiResponse<Page<TransactionResponse>> response =
                new ApiResponse<>(
                        true,
                        "Transaction history fetched successfully",
                        transactions
                );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<Void>> transferAmount(
            @Valid @RequestBody TransferRequest transferRequest) {

        transactionService.transfer(transferRequest);

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Amount transferred successfully",
                null
        );

        return ResponseEntity.ok(response);
    }
}