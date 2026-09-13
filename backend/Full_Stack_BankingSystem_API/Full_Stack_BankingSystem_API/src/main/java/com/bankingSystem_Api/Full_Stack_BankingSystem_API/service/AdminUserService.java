package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.AdminUserResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    private final UserRepository userRepository;

    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AdminUserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.getCreatedAt()
                ))
                .toList();
    }
}