package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class UnauthorizedAccountAccessException extends RuntimeException {
    public UnauthorizedAccountAccessException(String message) {
        super(message);
    }
}
