package com.expensetracker.service.impl;

import com.expensetracker.dto.CategoryDTO;
import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.dto.GroupDTO;
import com.expensetracker.model.Category;
import com.expensetracker.model.Expense;
import com.expensetracker.model.Group;
import com.expensetracker.model.User;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.service.CategoryService;
import com.expensetracker.service.ExpenseService;
import com.expensetracker.service.GroupService;
import com.expensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private GroupService groupService;

    @Override
    public ExpenseDTO createExpense(ExpenseDTO expenseDTO) {
        User user = userService.getEntityById(expenseDTO.getUserId());
        CategoryDTO categoryDTO = categoryService.getCategoryById(expenseDTO.getCategoryId(), expenseDTO.getUserId())
               if (categoryDTO == null) throw new RuntimeException("Category not found");
               Category category = convertToCategoryEntity(categoryDTO);

        Expense expense = new Expense();
        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setExpenseDate(expenseDTO.getExpenseDate());
        expense.setCategory(category);
        expense.setUser(user);

        if (expenseDTO.getGroupId() != null) {
            GroupDTO groupDTO = groupService.getGroupById(expenseDTO.getGroupId(), expenseDTO.getUserId());
            if (groupDTO == null) throw new RuntimeException("Group not found");
            Group group = convertToGroupEntity(groupDTO);
            expense.setGroup(group);
        }
        else {
        expense.setGroup(null);
    }

        Expense savedExpense = expenseRepository.save(expense);
        return convertToDTO(savedExpense);
    }

    @Override
    public ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO) {
        User user = userService.getEntityById(expenseDTO.getUserId());
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to update this expense");
        }

        Category category = categoryService.getCategoryById(expenseDTO.getCategoryId(), expenseDTO.getUserId())
                if (categoryDTO == null) throw new RuntimeException("Category not found");
               Category category = convertToCategoryEntity(categoryDTO);

        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setExpenseDate(expenseDTO.getExpenseDate());
        expense.setCategory(category);

        if (expenseDTO.getGroupId() != null) {
            Group group = groupService.getGroupById(expenseDTO.getGroupId(), expenseDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));
            expense.setGroup(group);
        } else {
            expense.setGroup(null);
        }

        Expense updatedExpense = expenseRepository.save(expense);
        return convertToDTO(updatedExpense);
    }
    private Group convertToGroupEntity(GroupDTO dto) {
    Group group = new Group();
    group.setId(dto.getId());
    group.setName(dto.getName());
    group.setDescription(dto.getDescription());
    if (dto.getUserId() != null) {
        User user = userService.getEntityById(dto.getUserId());
        group.setCreatedBy(user); 
    }
    return group;
}
private Category convertToCategoryEntity(CategoryDTO dto) {
    Category category = new Category();
    category.setId(dto.getId());
    category.setName(dto.getName());
     if (dto.getUserId() != null) {
        User user = userService.getEntityById(dto.getUserId());
        category.setUser(user); 
    }
    return category;
}

    @Override
    public void deleteExpense(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to delete this expense");
        }

        expenseRepository.delete(expense);
    }

    @Override
    public ExpenseDTO getExpenseById(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to view this expense");
        }

        return convertToDTO(expense);
    }

    @Override
    public List<ExpenseDTO> getExpensesByUser(Long userId) {
        User user = userService.getEntityById(userId);
        return expenseRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseDTO> getExpensesByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        User user = userService.getEntityById(userId);
        return expenseRepository.findByUserAndDateRange(user, start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseDTO> getExpensesByGroup(Long groupId) {
        GroupDTO groupDTO = groupService.getGroupById(groupId, null);
               if (groupDTO == null) throw new RuntimeException("Group not found");
               Group group = convertToGroupEntity(groupDTO);
        return expenseRepository.findByGroup(group).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Double getTotalExpensesByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        User user = userService.getEntityById(userId);
        return expenseRepository.getTotalExpensesByUserAndDateRange(user, start, end);
    }

    @Override
    public Double getTotalExpensesByGroupAndDateRange(Long groupId, LocalDateTime start, LocalDateTime end) {
        GroupDTO groupDTO = groupService.getGroupById(groupId, null);
        if (groupDTO == null) throw new RuntimeException("Group not found");

        Group group = convertToGroupEntity(groupDTO);

        return expenseRepository.getTotalExpensesByGroupAndDateRange(group, start, end);
    }

    private ExpenseDTO convertToDTO(Expense expense) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(expense.getId());
        dto.setDescription(expense.getDescription());
        dto.setAmount(expense.getAmount());
        dto.setExpenseDate(expense.getExpenseDate());
        dto.setCategoryId(expense.getCategory().getId());
        dto.setUserId(expense.getUser().getId());
        if (expense.getGroup() != null) {
            dto.setGroupId(expense.getGroup().getId());
        }
        dto.setCreatedAt(expense.getCreatedAt());
        dto.setUpdatedAt(expense.getUpdatedAt());
        return dto;
    }
} 