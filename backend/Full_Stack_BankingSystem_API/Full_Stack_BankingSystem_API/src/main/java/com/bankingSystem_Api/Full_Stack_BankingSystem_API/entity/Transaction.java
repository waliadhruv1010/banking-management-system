package com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.TransactionType;
import jakarta.persistence.*;
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

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private BigDecimal amount;

    private BigDecimal balanceAfter;

    private String description;

    private LocalDateTime createdAt;
    @PrePersist
    private void onCreate(){
        createdAt = LocalDateTime.now();
    }
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
