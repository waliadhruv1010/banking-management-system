package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class InsufficientBalanceException extends RuntimeException {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}
