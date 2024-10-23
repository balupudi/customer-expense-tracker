# Personal Expense Tracker API

A RESTful API for managing personal financial records, such as tracking income and expenses, with summaries by category or time period.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Postman Testing](#postman-testing)
- [License](#license)

## Overview

This API allows users to record and manage personal transactions, retrieve transaction histories, and generate financial summaries.

## Features

- **Add, Update, and Delete** transactions.
- **Retrieve** all transactions or a specific transaction by ID.
- **Summary** feature to get total income, expenses, and balance.
- Data is stored locally using **SQLite**.

## Technologies

- **Node.js** with **Express.js** for the backend.
- **SQLite3** for the database.
- **Body-Parser** for parsing incoming request bodies.

## Database Schema

### `categories`
| Field    | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| id       | INTEGER  | Primary key (auto-increment). |
| name     | TEXT     | Name of the category.         |
| type     | TEXT     | Either `income` or `expense`. |

### `transactions`
| Field       | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| id          | INTEGER | Primary key (auto-increment).         |
| type        | TEXT    | Either `income` or `expense`.         |
| category    | TEXT    | Category name (foreign key reference).|
| amount      | REAL    | Transaction amount.                   |
| date        | TEXT    | Date of the transaction.              |
| description | TEXT    | Optional description of the transaction. |

## API Endpoints

### 1. **Add a Transaction**
   - **POST** `/transactions`
   - **Description**: Adds a new transaction (income or expense).
   - **Request Body**:
     ```json
     {
       "type": "income",
       "category": "Salary",
       "amount": 1000,
       "date": "2024-10-22",
       "description": "Monthly salary"
     }
     ```
   - **Response**: `201 Created`
     ```json
     { "id": 1 }
     ```

### 2. **Get All Transactions**
   - **GET** `/transactions`
   - **Description**: Retrieves all transactions.
   - **Response**: `200 OK`
     ```json
     [
       {
         "id": 1,
         "type": "income",
         "category": "Salary",
         "amount": 1000,
         "date": "2024-10-22",
         "description": "Monthly salary"
       },
       {
         "id": 2,
         "type": "expense",
         "category": "Groceries",
         "amount": 100,
         "date": "2024-10-21",
         "description": "Weekly groceries"
       }
     ]
     ```

### 3. **Get Transaction by ID**
   - **GET** `/transactions/:id`
   - **Description**: Retrieves a specific transaction by ID.
   - **Response**: `200 OK`
     ```json
     {
       "id": 1,
       "type": "income",
       "category": "Salary",
       "amount": 1000,
       "date": "2024-10-22",
       "description": "Monthly salary"
     }
     ```

### 4. **Update a Transaction**
   - **PUT** `/transactions/:id`
   - **Description**: Updates a specific transaction by ID.
   - **Request Body**:
     ```json
     {
       "type": "expense",
       "category": "Groceries",
       "amount": 120,
       "date": "2024-10-22",
       "description": "Groceries update"
     }
     ```
   - **Response**: `200 OK`
     ```json
     { "changes": 1 }
     ```

### 5. **Delete a Transaction**
   - **DELETE** `/transactions/:id`
   - **Description**: Deletes a specific transaction by ID.
   - **Response**: `200 OK`
     ```json
     { "changes": 1 }
     ```

### 6. **Summary of Transactions**
   - **GET** `/summary`
   - **Description**: Retrieves a summary of total income, total expenses, and balance.
   - **Response**: `200 OK`
     ```json
     {
       "total_income": 1000,
       "total_expenses": 100,
       "balance": 900
     }
     ```

## Setup Instructions

### 1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/personal-expense-tracker.git
   cd personal-expense-tracker

2. **Install Dependencies**:
   ```bash
   npm install

3. **Run the Application**:
    node index.js

The server will start at http://localhost:3000.

Database Initialization: The SQLite database will be automatically created in the root folder as expenses.db with the necessary tables.

Usage
Add a Transaction: Use POST /transactions to add income or expense.
Get All Transactions: Use GET /transactions to fetch all transactions.
Get a Transaction: Use GET /transactions/:id to fetch a transaction by ID.
Update a Transaction: Use PUT /transactions/:id to modify an existing transaction.
Delete a Transaction: Use DELETE /transactions/:id to remove a transaction.
Postman Testing
You can use Postman to test the API endpoints.

Import the following sample requests into Postman:

POST /transactions (Add Transaction):

GET /transactions (Retrieve Transactions):

GET /transactions/
(Retrieve Transaction by ID):

PUT /transactions/
(Update Transaction):

DELETE /transactions/
(Delete Transaction):

GET /summary (Summary of Transactions):

License
This project is licensed under the MIT License. See the LICENSE file for details.
