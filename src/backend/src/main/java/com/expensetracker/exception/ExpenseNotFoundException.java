package com.expensetracker.exception;

import org.springframework.http.HttpStatus;

public class ExpenseNotFoundException extends BaseException {
    public ExpenseNotFoundException(Long expenseId) {
        super(String.format("Expense with id %d not found", expenseId), HttpStatus.NOT_FOUND);
    }
} 