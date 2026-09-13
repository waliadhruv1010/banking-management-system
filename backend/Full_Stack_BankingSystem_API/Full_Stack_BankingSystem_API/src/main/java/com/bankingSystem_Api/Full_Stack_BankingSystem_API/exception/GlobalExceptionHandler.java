package com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 - Account not found
    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleAccountNotFound(
            AccountNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage()));
    }


    // 404 - User not found
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(
            UserNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", ex.getMessage()));
    }


    // 400 - Invalid amount
    @ExceptionHandler(InvalidAmountException.class)
    public ResponseEntity<Map<String, String>> handleInvalidAmount(
            InvalidAmountException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage()));
    }


    // 400 - Insufficient balance
    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<Map<String, String>> handleInsufficientBalance(
            InsufficientBalanceException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", ex.getMessage()));
    }


    // 403 - Unauthorized account access
    @ExceptionHandler(UnauthorizedAccountAccessException.class)
    public ResponseEntity<Map<String, String>> handleUnauthorizedAccess(
            UnauthorizedAccountAccessException ex) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", ex.getMessage()));
    }


    // 403 - Account blocked/closed
    @ExceptionHandler(AccountNotActiveException.class)
    public ResponseEntity<Map<String, String>> handleAccountNotActive(
            AccountNotActiveException ex) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", ex.getMessage()));
    }


    // 400 - @Valid validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("Invalid request");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", message));
    }
}