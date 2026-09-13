package com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountStatus;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    private LocalDateTime createdAt;

    private BigDecimal balance;

    @PrePersist
    private void onAccountCreate(){

        createdAt = LocalDateTime.now();
    }


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;
}
