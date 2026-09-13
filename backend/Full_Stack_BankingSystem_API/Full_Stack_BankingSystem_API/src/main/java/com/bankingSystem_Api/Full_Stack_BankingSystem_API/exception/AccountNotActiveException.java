package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class AccountNotActiveException extends RuntimeException {
    public AccountNotActiveException(String message) {
        super(message);
    }
}
