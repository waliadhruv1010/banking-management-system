# 🏦 Banking Management System

### 🔐 Secure Full-Stack Digital Banking Platform

A modern **full-stack Banking Management System** built with **Java, Spring Boot, Spring Security, JWT, MySQL, and React**.

The application provides secure banking operations including **user authentication, account management, deposits, withdrawals, fund transfers, transaction history, and administrative account management**.

> 💡 Built to demonstrate practical **Java Backend + Spring Boot + REST API + React** development.

---

## ✨ What Makes This Project Interesting?

This isn't just a CRUD application.

The system implements real banking-style business logic such as:

- 🔐 JWT-based authentication
- 🛡️ Role-Based Access Control
- 💰 Secure fund transfers
- 🔄 Atomic transactions using `@Transactional`
- 🧾 Complete transaction tracking
- 👤 User ownership validation
- 🚫 Account status enforcement
- 🔒 BCrypt password hashing
- ⚠️ Global exception handling
- 📦 DTO-based API architecture
- 🧪 Unit-tested business logic
- 🎨 Modern React dashboard
- 👨‍💼 Dedicated Admin Panel

---

# 🖥️ Application Preview

## 👤 User Dashboard

![User Dashboard](screenshots/dashboard.png)

## 💳 Account Management

![Accounts](screenshots/accounts.png)

## 💸 Transactions

![Transactions](screenshots/transactions.png)

## 👨‍💼 Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

> 📌 Add your actual screenshots inside the `screenshots/` folder.

---

# 🚀 Core Features

## 👤 User Module

| Feature | Status |
|---|---|
| User Registration | ✅ |
| Secure Login | ✅ |
| JWT Authentication | ✅ |
| User Profile | ✅ |
| Change Password | ✅ |
| Create Account | ✅ |
| View Accounts | ✅ |
| Deposit | ✅ |
| Withdraw | ✅ |
| Fund Transfer | ✅ |
| Transaction History | ✅ |

---

## 🏦 Account Management

Users can create different types of bank accounts:

```text
┌─────────────────────────────┐
│        ACCOUNT TYPES        │
├─────────────────────────────┤
│                             │
│   💰 SAVINGS                │
│                             │
│   💳 CURRENT                │
│                             │
└─────────────────────────────┘
```

Each account maintains:

- Account Number
- Account Type
- Balance
- Status
- Creation Date
- Account Owner

### Account Status

```text
ACTIVE
BLOCKED
CLOSED
```

Transactions are only permitted when the account is in an appropriate active state.

---

# 💰 Banking Operations

## Deposit

```text
User
 ↓
Select Account
 ↓
Enter Amount
 ↓
Validate Account
 ↓
Add Amount to Balance
 ↓
Create Transaction Record
 ↓
Updated Balance
```

---

## Withdraw

```text
User
 ↓
Select Account
 ↓
Enter Amount
 ↓
Validate Account
 ↓
Check Available Balance
 ↓
Deduct Amount
 ↓
Create Transaction Record
 ↓
Updated Balance
```

Insufficient balance is rejected before the withdrawal is completed.

---

# 🔄 Secure Fund Transfer

One of the core features of the application is transferring money between two accounts.

```text
              TRANSFER
                  │
                  ▼
        ┌───────────────────┐
        │ Validate Sender   │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Validate Receiver │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Check Balance     │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Debit Sender      │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Credit Receiver   │
        └─────────┬─────────┘
                  ▼
        ┌───────────────────┐
        │ Record Transactions│
        └─────────┬─────────┘
                  ▼
                COMMIT
```

The transfer operation uses:

```java
@Transactional
```

This helps ensure that the transfer behaves as a single database transaction.

If a failure occurs during the operation, the transaction can be rolled back rather than leaving the accounts in an inconsistent state.

---

# 🔐 Security Architecture

The application uses **Spring Security + JWT** for stateless authentication.

```text
                    USER
                      │
                      ▼
                Login Request
                      │
                      ▼
              Spring Security
                      │
                      ▼
                JWT Generated
                      │
                      ▼
                 React App
                      │
                      ▼
            Authorization Header
                      │
                      ▼
          JwtAuthenticationFilter
                      │
                      ▼
               JWT Validation
                      │
                      ▼
              Security Context
                      │
                      ▼
              Protected API
```

### Security Features

- JWT authentication
- BCrypt password hashing
- Stateless sessions
- Protected REST endpoints
- Role-based authorization
- Admin endpoint protection
- Account ownership validation
- Account status validation
- Password exclusion from API responses
- Request validation
- Global exception handling

---

# 👨‍💼 Admin Panel

The application contains a dedicated administrative interface.

### Admin Dashboard

Provides an overview of:

```text
┌──────────────────────────────────────┐
│            ADMIN DASHBOARD           │
├──────────────────────────────────────┤
│                                      │
│  👥 Total Users                      │
│  🏦 Total Accounts                   │
│  ✅ Active Accounts                  │
│  🚫 Blocked Accounts                 │
│                                      │
└──────────────────────────────────────┘
```

### Admin Capabilities

```text
Admin
 │
 ├── Dashboard
 │
 ├── Users
 │    └── View all users
 │
 ├── Accounts
 │    ├── View accounts
 │    ├── Block account
 │    ├── Unblock account
 │    └── Close account
 │
 └── Transactions
      └── View all transactions
```

---

# 🧑‍💻 User vs Admin Authorization

The system supports two roles:

```text
USER
ADMIN
```

### USER

Can access:

```text
Personal Profile
Personal Accounts
Deposits
Withdrawals
Transfers
Transaction History
```

### ADMIN

Can additionally access:

```text
Admin Dashboard
All Users
All Accounts
All Transactions
Account Blocking
Account Unblocking
Account Closing
```

Regular users cannot access:

```text
/api/admin/**
```

---

# 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │   React Client  │
                         │                 │
                         │  Vite + React   │
                         │  Tailwind CSS   │
                         └────────┬────────┘
                                  │
                             REST API
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    Spring Boot API     │
                    │                         │
                    │ Controllers             │
                    │ DTOs                    │
                    │ Services                │
                    │ Security                │
                    │ Exception Handling      │
                    └────────────┬────────────┘
                                 │
                          Spring Data JPA
                                 │
                                 ▼
                       ┌──────────────────┐
                       │      MySQL       │
                       │                  │
                       │ User             │
                       │ Account          │
                       │ Transaction      │
                       └──────────────────┘
```

---

# 🧩 Backend Architecture

The backend follows a layered architecture:

```text
Controller
     ↓
DTO
     ↓
Service
     ↓
Repository
     ↓
Entity
     ↓
MySQL
```

### Controller

Handles:

- HTTP requests
- Request mapping
- Response handling

### DTO

Handles:

- Request data
- Response data
- Validation
- Preventing direct entity exposure

### Service

Contains:

- Banking business logic
- Authentication logic
- Authorization-related checks
- Transaction processing

### Repository

Handles:

- Database operations
- JPA queries
- Entity persistence

---

# 🗄️ Database Design

The main entity relationship is:

```text
                    USER
                      │
                      │ 1
                      │
                      │ N
                      ▼
                   ACCOUNT
                      │
                      │ 1
                      │
                      │ N
                      ▼
                 TRANSACTION
```

## User

```text
id
name
email
password
role
createdAt
```

## Account

```text
id
accountNumber
accountType
status
balance
createdAt
user_id
```

## Transaction

```text
id
type
amount
balanceAfter
description
createdAt
account_id
```

---

# 📡 REST API

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## User

```http
GET  /api/users/me
POST /api/users/change-password
```

## Accounts

```http
GET  /api/accounts
POST /api/accounts
```

## Transactions

```http
POST /api/transactions/{accountNumber}/deposit

POST /api/transactions/{accountNumber}/withdraw

POST /api/transactions/transfer

GET /api/transactions/{accountNumber}/history
```

## Admin

```http
GET /api/admin/dashboard

GET /api/admin/users

GET /api/admin/accounts

GET /api/admin/transactions

PUT /api/admin/accounts/{accountNumber}/block

PUT /api/admin/accounts/{accountNumber}/unblock

PUT /api/admin/accounts/{accountNumber}/close
```

---

# 🛠️ Technology Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Bean Validation
- Lombok

### Frontend

- React
- JavaScript
- Vite
- Axios
- React Router
- Tailwind CSS
- Lucide React

### Development Tools

- IntelliJ IDEA
- MySQL Workbench
- Git
- GitHub
- Postman

---

# 🧪 Testing

Core application functionality has been tested, including:

```text
✅ User Registration
✅ Login
✅ JWT Authentication
✅ Account Creation
✅ Deposit
✅ Withdrawal
✅ Fund Transfer
✅ Insufficient Balance
✅ Transaction History
✅ Account Status Validation
✅ Admin Authorization
✅ Protected APIs
```

---

# 📂 Project Structure

```text
banking-management-system/
│
├── backend/
│   └── Full_Stack_BankingSystem_API/
│       ├── src/
│       ├── pom.xml
│       └── ...
│
├── frontend/
│   └── Full_Stack_BankingSystem_Frontend/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── screenshots/
│   ├── dashboard.png
│   ├── accounts.png
│   ├── transactions.png
│   ├── admin-dashboard.png
│   └── ...
│
├── README.md
└── .gitignore
```

---

# ⚙️ Run Locally

## 1️⃣ Clone

```bash
git clone https://github.com/YOUR_USERNAME/banking-management-system.git
cd banking-management-system
```

## 2️⃣ Database

Create the MySQL database:

```sql
CREATE DATABASE banking_system;
```

Configure the backend using environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
```

## 3️⃣ Start Backend

```bash
cd backend/Full_Stack_BankingSystem_API
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## 4️⃣ Start Frontend

Open another terminal:

```bash
cd frontend/Full_Stack_BankingSystem_Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 Deployment

Recommended production architecture:

```text
                    GitHub
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
          Render             Vercel
        Spring Boot           React
             │
             ▼
           MySQL
```

### Backend

Deploy the Spring Boot API using a cloud platform such as Render.

### Frontend

Deploy the React/Vite application using Vercel.

### Database

Use a managed MySQL deployment or a cloud-hosted MySQL instance.

### Production Environment Variables

Never commit production credentials.

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
```

The frontend should use:

```text
VITE_API_BASE_URL
```

to point to the deployed backend.

---

# 🔒 Environment & Secrets

Sensitive configuration should never be committed to GitHub.

Do not commit:

```text
.env
Database passwords
JWT secrets
API keys
Production credentials
```

Use environment variables instead.

---

# 📈 Future Improvements

Potential future enhancements:

```text
☐ Docker
☐ CI/CD
☐ Redis caching
☐ Kafka event processing
☐ Email notifications
☐ Cloud monitoring
☐ Advanced analytics
☐ Automated database backups
```

---

# 🎯 Project Goals

This project was developed to gain practical experience in:

```text
Java
   ↓
Spring Boot
   ↓
REST APIs
   ↓
Spring Security
   ↓
JWT
   ↓
JPA / Hibernate
   ↓
MySQL
   ↓
React
   ↓
Full-Stack Development
```

---

# 👨‍💻 Author

## Dhruv Walia

**Java Backend Developer**

Interested in building scalable backend systems using:

```text
Java
Spring Boot
Spring Security
REST APIs
MySQL
React
```

---

# ⭐ If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐.

---

## 📌 Disclaimer

This project is developed for **educational and portfolio purposes** and does not represent a production banking infrastructure.

---

### 🚀 Built with Java + Spring Boot + React
### 🔐 Secured with Spring Security + JWT
### 💾 Powered by MySQL
