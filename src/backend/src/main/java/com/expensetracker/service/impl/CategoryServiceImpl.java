package com.expensetracker.service.impl;

import com.expensetracker.dto.CategoryDTO;
import com.expensetracker.exception.DuplicateCategoryException;
import com.expensetracker.model.Category;
import com.expensetracker.model.User;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.service.CategoryService;
import com.expensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserService userService;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        User user = userService.getEntityById(categoryDTO.getUserId());
        
        System.out.println("Checking if category exists: " + categoryDTO.getName() + " for user: " + user.getId());
        boolean exists = categoryRepository.existsByNameAndUser(categoryDTO.getName(), user);
        System.out.println("Category exists: " + exists);
        
        if (exists) {
            System.out.println("Throwing DuplicateCategoryException");
            throw new DuplicateCategoryException("Category with name '" + categoryDTO.getName() + "' already exists for this user");
        }

        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setColor(categoryDTO.getColor());
        category.setUser(user);

        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        User user = userService.getEntityById(categoryDTO.getUserId());
        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDTO.getName());
        category.setColor(categoryDTO.getColor());

        Category updatedCategory = categoryRepository.save(category);
        return convertToDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }

    @Override
    public CategoryDTO getCategoryById(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Category category = categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return convertToDTO(category);
    }

    @Override
    public List<CategoryDTO> getCategoriesByUser(Long userId) {
        User user = userService.getEntityById(userId);
        return categoryRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setColor(category.getColor());
        dto.setUserId(category.getUser().getId());
        return dto;
    }
} 