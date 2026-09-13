package com.bankingSystem_Api.Full_Stack_BankingSystem_API.security;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.CustomUserDetailsService;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService customUserDetailsService) {

        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("=================================");
        System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());
        System.out.println("Authorization Header: " + authHeader);

        // Check whether Authorization header exists
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No valid Bearer token found.");

            filterChain.doFilter(request, response);
            return;
        }

        try {

            // Remove "Bearer " from token
            String token = authHeader.substring(7);

            // Extract email from JWT
            String email = jwtService.extractEmail(token);

            System.out.println("Authenticated Email: " + email);

            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                // Load user from database
                UserDetails userDetails =
                        customUserDetailsService.loadUserByUsername(email);

                // IMPORTANT:
                // This should print [ROLE_ADMIN] for admin@gmail.com
                System.out.println(
                        "User Authorities: " +
                                userDetails.getAuthorities()
                );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println(
                        "Security Context Authentication: " +
                                SecurityContextHolder
                                        .getContext()
                                        .getAuthentication()
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT Authentication failed: " +
                            e.getMessage()
            );

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);

        System.out.println(
                "Response Status: " +
                        response.getStatus()
        );

        System.out.println("=================================");
    }
}