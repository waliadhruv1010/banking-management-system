package com.bankingSystem_Api.Full_Stack_BankingSystem_API.controller;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public String Apitest(){
        return "Jwt is working";
    }
}
