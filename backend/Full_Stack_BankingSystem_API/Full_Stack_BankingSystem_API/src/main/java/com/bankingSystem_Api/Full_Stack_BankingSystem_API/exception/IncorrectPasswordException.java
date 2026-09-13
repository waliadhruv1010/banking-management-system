package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class IncorrectPasswordException extends RuntimeException {

    public IncorrectPasswordException() {
    }

    public IncorrectPasswordException(String message) {
        super(message);
    }
}