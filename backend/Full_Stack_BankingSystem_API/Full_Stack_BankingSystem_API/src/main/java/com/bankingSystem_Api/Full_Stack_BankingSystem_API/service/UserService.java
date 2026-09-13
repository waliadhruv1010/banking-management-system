package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.ChangePasswordRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.LoginRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.RegisterRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.UserResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.Role;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.EmailAlreadyExistException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.IncorrectPasswordException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.UserNotFoundException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    public Boolean registerUser(RegisterRequest registerRequest) {

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistException("User Already Exist");
        }
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );
        user.setRole(Role.USER);
        userRepository.save(user);
        return true;
    }



    public String loginUser(LoginRequest loginRequest){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        authenticationManager.authenticate(token);
        return jwtService.generateToken(loginRequest.getEmail());
    }

    public UserResponse getMyProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        return new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    public void changePassword(ChangePasswordRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getCurrentPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new IncorrectPasswordException(
                    "Current password is incorrect"
            );
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }

}
