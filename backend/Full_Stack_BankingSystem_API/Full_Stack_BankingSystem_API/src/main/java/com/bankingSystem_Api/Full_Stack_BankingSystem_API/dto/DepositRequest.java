package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepositRequest {

    @NotNull(message = "Deposit amount is required")
    @DecimalMin(value = "0.01", message = "Deposit amount must be greater than zero")
    private BigDecimal amount;
}