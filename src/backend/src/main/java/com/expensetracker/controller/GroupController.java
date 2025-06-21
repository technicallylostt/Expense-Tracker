package com.expensetracker.controller;

import com.expensetracker.dto.GroupDTO;
import com.expensetracker.service.GroupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<GroupDTO> createGroup(@Valid @RequestBody GroupDTO groupDTO) {
        return ResponseEntity.ok(groupService.createGroup(groupDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long id, @Valid @RequestBody GroupDTO groupDTO) {
        return ResponseEntity.ok(groupService.updateGroup(id, groupDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id, @RequestParam Long userId) {
        groupService.deleteGroup(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDTO> getGroupById(@PathVariable Long id, @RequestParam Long userId) {
        return ResponseEntity.ok(groupService.getGroupById(id, userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GroupDTO>> getGroupsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(groupService.getGroupsByUser(userId));
    }
} 