package com.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
    private Long id;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;
    
    @NotNull(message = "Expense date is required")
    private LocalDateTime expenseDate;
    
    @NotNull(message = "Category is required")
    private Long categoryId;
    
    private Long userId;
    private Long groupId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 