package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import com.expensetracker.model.Category;
import com.expensetracker.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserAndCategory(User user, Category category);
    List<Expense> findByGroup(Group group);
    
    @Query("SELECT e FROM Expense e WHERE e.user = ?1 AND e.expenseDate BETWEEN ?2 AND ?3")
    List<Expense> findByUserAndDateRange(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT e FROM Expense e WHERE e.group = ?1 AND e.expenseDate BETWEEN ?2 AND ?3")
    List<Expense> findByGroupAndDateRange(Group group, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user = ?1 AND e.expenseDate BETWEEN ?2 AND ?3")
    Double getTotalExpensesByUserAndDateRange(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.group = ?1 AND e.expenseDate BETWEEN ?2 AND ?3")
    Double getTotalExpensesByGroupAndDateRange(Group group, LocalDateTime startDate, LocalDateTime endDate);
} 