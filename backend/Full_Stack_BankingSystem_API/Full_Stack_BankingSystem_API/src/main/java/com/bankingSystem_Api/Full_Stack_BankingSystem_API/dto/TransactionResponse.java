package com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.TransactionType;
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
public class TransactionResponse {
    private Long id;
    private TransactionType type;
    private BigDecimal amount;
    private BigDecimal balanceAfter;
    private String description;
    private LocalDateTime createdAt;

}
