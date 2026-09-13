package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

public class EmailAlreadyExistException extends RuntimeException{
    public EmailAlreadyExistException() {
    }

    public EmailAlreadyExistException(String message) {
        super(message);
    }
}
