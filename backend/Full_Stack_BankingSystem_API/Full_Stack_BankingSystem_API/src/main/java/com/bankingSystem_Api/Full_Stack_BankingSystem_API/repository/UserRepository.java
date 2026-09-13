package com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
}
