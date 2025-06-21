package com.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDTO {
    private Long id;
    
    @NotBlank(message = "Group name is required")
    private String name;
    
    private String description;
    private Set<Long> memberIds;
    private Long UserId;
    private Long createdById;
} 