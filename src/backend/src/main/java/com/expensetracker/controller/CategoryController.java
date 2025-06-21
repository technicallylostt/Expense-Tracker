package com.expensetracker.controller;

import com.expensetracker.dto.CategoryDTO;
import com.expensetracker.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id, @RequestParam Long userId) {
        categoryService.deleteCategory(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id, @RequestParam Long userId) {
        return ResponseEntity.ok(categoryService.getCategoryById(id, userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(categoryService.getCategoriesByUser(userId));
    }
} 