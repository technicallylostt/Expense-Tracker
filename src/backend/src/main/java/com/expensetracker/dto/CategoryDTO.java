package com.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    
    @NotBlank(message = "Category name is required")
    private String name;
    
    @NotBlank(message = "Category color is required")
    private String color;
    
    private Long userId;
} 