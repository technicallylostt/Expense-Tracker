package com.expensetracker.service;

import com.expensetracker.dto.ExpenseDTO;
import java.time.LocalDateTime;
import java.util.List;

public interface ExpenseService {
    ExpenseDTO createExpense(ExpenseDTO expenseDTO);
    ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO);
    void deleteExpense(Long id, Long userId);
    ExpenseDTO getExpenseById(Long id, Long userId);
    List<ExpenseDTO> getExpensesByUser(Long userId);
    List<ExpenseDTO> getExpensesByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end);
    List<ExpenseDTO> getExpensesByGroup(Long groupId);
    Double getTotalExpensesByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end);
    Double getTotalExpensesByGroupAndDateRange(Long groupId, LocalDateTime start, LocalDateTime end);
} 