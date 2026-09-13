package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException(String message) {
        super(message);
    }
}
