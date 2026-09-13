package com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByAccountNumber(Long accountNumber);
    List<Account> findByUser(User user);
}
