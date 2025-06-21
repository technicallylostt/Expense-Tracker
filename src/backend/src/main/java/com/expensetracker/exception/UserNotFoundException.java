package com.expensetracker.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends BaseException {
    public UserNotFoundException(Long userId) {
        super(String.format("User with id %d not found", userId), HttpStatus.NOT_FOUND);
    }

    public UserNotFoundException(String email) {
        super(String.format("User with email %s not found", email), HttpStatus.NOT_FOUND);
    }
} 