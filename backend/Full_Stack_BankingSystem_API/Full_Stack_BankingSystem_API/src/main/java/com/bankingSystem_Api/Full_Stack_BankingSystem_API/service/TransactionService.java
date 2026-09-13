package com.bankingSystem_Api.Full_Stack_BankingSystem_API.service;

import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.TransactionResponse;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.dto.TransferRequest;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Account;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Transaction;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.User;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.AccountStatus;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.entity.Enums.TransactionType;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.AccountNotActiveException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.AccountNotFoundException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.InsufficientBalanceException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.InvalidAmountException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.UnauthorizedAccountAccessException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.exception.UserNotFoundException;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.AccountRepository;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.TransactionRepository;
import com.bankingSystem_Api.Full_Stack_BankingSystem_API.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository,
                              UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // DEPOSIT
    // =========================

    @Transactional
    public void deposit(Long accountNumber, BigDecimal amount) {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidAmountException(
                    "Deposit amount must be greater than zero"
            );
        }

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account Number not found"
                        )
                );

        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new AccountNotActiveException(
                    "Account is not Active"
            );
        }

        User loggedInUser = getLoggedInUser();

        if (!loggedInUser.getId().equals(account.getUser().getId())) {
            throw new UnauthorizedAccountAccessException(
                    "Unauthorized account access"
            );
        }

        BigDecimal currentBalance = account.getBalance();

        BigDecimal newBalance = currentBalance.add(amount);

        account.setBalance(newBalance);

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setType(TransactionType.DEPOSIT);
        transaction.setAmount(amount);
        transaction.setBalanceAfter(newBalance);
        transaction.setDescription("Amount added successfully");
        transaction.setAccount(account);

        transactionRepository.save(transaction);
    }


    // =========================
    // WITHDRAW
    // =========================

    @Transactional
    public void withdraw(Long accountNumber, BigDecimal amount) {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidAmountException(
                    "Withdraw amount must be greater than zero"
            );
        }

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account Number not found"
                        )
                );

        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new AccountNotActiveException(
                    "Account is not Active"
            );
        }

        User loggedInUser = getLoggedInUser();

        if (!loggedInUser.getId().equals(account.getUser().getId())) {
            throw new UnauthorizedAccountAccessException(
                    "Unauthorized account access"
            );
        }

        BigDecimal currentBalance = account.getBalance();

        if (amount.compareTo(currentBalance) > 0) {
            throw new InsufficientBalanceException(
                    "Insufficient Balance"
            );
        }

        BigDecimal newBalance = currentBalance.subtract(amount);

        account.setBalance(newBalance);

        accountRepository.save(account);

        Transaction transaction = new Transaction();

        transaction.setType(TransactionType.WITHDRAW);
        transaction.setAmount(amount);
        transaction.setBalanceAfter(newBalance);
        transaction.setDescription("Amount Withdrawn successfully");
        transaction.setAccount(account);

        transactionRepository.save(transaction);
    }


    // =========================
    // TRANSACTION HISTORY
    // =========================

    public Page<TransactionResponse> getTransactionHistory(
            Long accountNumber,
            Pageable pageable) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account Number not found"
                        )
                );

        User loggedInUser = getLoggedInUser();

        if (!loggedInUser.getId().equals(account.getUser().getId())) {
            throw new UnauthorizedAccountAccessException(
                    "Unauthorized account access"
            );
        }

        Page<Transaction> transactions =
                transactionRepository
                        .findByAccountAccountNumber(
                                accountNumber,
                                pageable
                        );

        return transactions.map(this::convertToResponse);
    }


    // =========================
    // TRANSFER
    // =========================

    @Transactional
    public boolean transfer(TransferRequest transferRequest) {

        if (transferRequest == null ||
                transferRequest.getAmount() == null ||
                transferRequest.getAmount()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            throw new InvalidAmountException(
                    "Transfer amount must be greater than zero"
            );
        }

        Account senderAccount =
                accountRepository
                        .findByAccountNumber(
                                transferRequest
                                        .getSenderAccountNumber()
                        )
                        .orElseThrow(() ->
                                new AccountNotFoundException(
                                        "Sender account number not found"
                                )
                        );

        Account receiverAccount =
                accountRepository
                        .findByAccountNumber(
                                transferRequest
                                        .getReceiverAccountNumber()
                        )
                        .orElseThrow(() ->
                                new AccountNotFoundException(
                                        "Receiver account number not found"
                                )
                        );

        User loggedInUser = getLoggedInUser();

        if (!loggedInUser.getId()
                .equals(senderAccount.getUser().getId())) {

            throw new UnauthorizedAccountAccessException(
                    "Unauthorized account access"
            );
        }

        if (senderAccount.getAccountNumber()
                .equals(receiverAccount.getAccountNumber())) {

            throw new InvalidAmountException(
                    "Transfer not allowed between same accounts"
            );
        }

        if (senderAccount.getStatus() != AccountStatus.ACTIVE ||
                receiverAccount.getStatus() != AccountStatus.ACTIVE) {

            throw new AccountNotActiveException(
                    "Transfer not allowed because one or both accounts are not active"
            );
        }

        BigDecimal transferAmount =
                transferRequest.getAmount();

        if (transferAmount.compareTo(
                senderAccount.getBalance()) > 0) {

            throw new InsufficientBalanceException(
                    "Insufficient Balance"
            );
        }

        BigDecimal senderNewBalance =
                senderAccount.getBalance()
                        .subtract(transferAmount);

        BigDecimal receiverNewBalance =
                receiverAccount.getBalance()
                        .add(transferAmount);

        senderAccount.setBalance(senderNewBalance);
        receiverAccount.setBalance(receiverNewBalance);

        accountRepository.save(senderAccount);
        accountRepository.save(receiverAccount);


        // Sender transaction

        Transaction senderTransaction =
                new Transaction();

        senderTransaction.setType(
                TransactionType.TRANSFER_OUT
        );

        senderTransaction.setAmount(
                transferAmount
        );

        senderTransaction.setBalanceAfter(
                senderNewBalance
        );

        senderTransaction.setDescription(
                "Transfer to account "
                        + receiverAccount.getAccountNumber()
        );

        senderTransaction.setAccount(senderAccount);

        transactionRepository.save(senderTransaction);


        // Receiver transaction

        Transaction receiverTransaction =
                new Transaction();

        receiverTransaction.setType(
                TransactionType.TRANSFER_IN
        );

        receiverTransaction.setAmount(
                transferAmount
        );

        receiverTransaction.setBalanceAfter(
                receiverNewBalance
        );

        receiverTransaction.setDescription(
                "Received from account "
                        + senderAccount.getAccountNumber()
        );

        receiverTransaction.setAccount(receiverAccount);

        transactionRepository.save(receiverTransaction);

        return true;
    }


    // =========================
    // GET LOGGED-IN USER
    // =========================

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User Not found"
                        )
                );
    }


    // =========================
    // ENTITY → DTO
    // =========================

    public TransactionResponse convertToResponse(
            Transaction transaction) {

        TransactionResponse response =
                new TransactionResponse();

        response.setId(transaction.getId());
        response.setType(transaction.getType());
        response.setAmount(transaction.getAmount());
        response.setBalanceAfter(
                transaction.getBalanceAfter()
        );
        response.setDescription(
                transaction.getDescription()
        );
        response.setCreatedAt(
                transaction.getCreatedAt()
        );

        return response;
    }
}