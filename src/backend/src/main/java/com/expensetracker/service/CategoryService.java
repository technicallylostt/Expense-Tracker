package com.expensetracker.service;

import com.expensetracker.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);
    void deleteCategory(Long id, Long userId);
    CategoryDTO getCategoryById(Long id, Long userId);
    List<CategoryDTO> getCategoriesByUser(Long userId);
} 