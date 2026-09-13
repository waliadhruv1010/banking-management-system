package com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findByAccountAccountNumber(
            Long accountNumber,
            Pageable pageable
    );
}