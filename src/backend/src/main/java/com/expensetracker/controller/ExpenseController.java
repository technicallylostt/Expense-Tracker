package com.expensetracker.controller;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDTO> createExpense(@Valid @RequestBody ExpenseDTO expenseDTO) {
        return ResponseEntity.ok(expenseService.createExpense(expenseDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDTO> updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseDTO expenseDTO) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expenseDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, @RequestParam Long userId) {
        expenseService.deleteExpense(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDTO> getExpenseById(@PathVariable Long id, @RequestParam Long userId) {
        return ResponseEntity.ok(expenseService.getExpenseById(id, userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(expenseService.getExpensesByUser(userId));
    }

    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByUserAndDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(expenseService.getExpensesByUserAndDateRange(userId, start, end));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByGroup(@PathVariable Long groupId) {
        return ResponseEntity.ok(expenseService.getExpensesByGroup(groupId));
    }

    @GetMapping("/user/{userId}/total")
    public ResponseEntity<Double> getTotalExpensesByUserAndDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(expenseService.getTotalExpensesByUserAndDateRange(userId, start, end));
    }

    @GetMapping("/group/{groupId}/total")
    public ResponseEntity<Double> getTotalExpensesByGroupAndDateRange(
            @PathVariable Long groupId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(expenseService.getTotalExpensesByGroupAndDateRange(groupId, start, end));
    }
} 