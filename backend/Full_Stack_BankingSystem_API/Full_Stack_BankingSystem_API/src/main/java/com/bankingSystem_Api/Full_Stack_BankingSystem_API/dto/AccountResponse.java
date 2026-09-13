package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountStatus;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {
    private Long accountNumber;
    private AccountType accountType;
    private AccountStatus status;
    private BigDecimal balance;
    private LocalDateTime createdAt;

}
