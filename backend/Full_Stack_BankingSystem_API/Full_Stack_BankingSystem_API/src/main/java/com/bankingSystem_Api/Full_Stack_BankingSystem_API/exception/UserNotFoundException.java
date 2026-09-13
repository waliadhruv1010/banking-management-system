package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
