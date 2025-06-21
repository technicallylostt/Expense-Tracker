package com.expensetracker.service.impl;

import com.expensetracker.dto.GroupDTO;
import com.expensetracker.model.Group;
import com.expensetracker.model.User;
import com.expensetracker.repository.GroupRepository;
import com.expensetracker.service.GroupService;
import com.expensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserService userService;

    @Override
    public GroupDTO createGroup(GroupDTO groupDTO) {
        User creator = userService.getEntityById(groupDTO.getCreatedById());
        
        if (groupRepository.existsByNameAndCreatedBy(groupDTO.getName(), creator)) {
            throw new RuntimeException("Group with this name already exists");
        }

        Group group = new Group();
        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());
        group.setCreatedBy(creator);

        if (groupDTO.getMemberIds() != null) {
            Set<User> members = groupDTO.getMemberIds().stream()
                    .map(userService::getEntityById)
                    .collect(Collectors.toSet());
            group.setMembers(members);
        }

        Group savedGroup = groupRepository.save(group);
        return convertToDTO(savedGroup);
    }

    @Override
    public GroupDTO updateGroup(Long id, GroupDTO groupDTO) {
        User creator = userService.getEntityById(groupDTO.getCreatedById());
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!group.getCreatedBy().getId().equals(creator.getId())) {
            throw new RuntimeException("Not authorized to update this group");
        }

        group.setName(groupDTO.getName());
        group.setDescription(groupDTO.getDescription());

        if (groupDTO.getMemberIds() != null) {
            Set<User> members = groupDTO.getMemberIds().stream()
                    .map(userService::getEntityById)
                    .collect(Collectors.toSet());
            group.setMembers(members);
        }

        Group updatedGroup = groupRepository.save(group);
        return convertToDTO(updatedGroup);
    }

    @Override
    public void deleteGroup(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!group.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to delete this group");
        }

        groupRepository.delete(group);
    }

    @Override
    public GroupDTO getGroupById(Long id, Long userId) {
        User user = userService.getEntityById(userId);
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!group.getCreatedBy().getId().equals(user.getId()) && 
            !group.getMembers().contains(user)) {
            throw new RuntimeException("Not authorized to view this group");
        }

        return convertToDTO(group);
    }

    @Override
    public List<GroupDTO> getGroupsByUser(Long userId) {
        User user = userService.getEntityById(userId);
        return groupRepository.findAllGroupsForUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private GroupDTO convertToDTO(Group group) {
        GroupDTO dto = new GroupDTO();
        dto.setId(group.getId());
        dto.setName(group.getName());
        dto.setDescription(group.getDescription());
        dto.setCreatedById(group.getCreatedBy().getId());
        dto.setMemberIds(group.getMembers().stream()
                .map(User::getId)
                .collect(Collectors.toSet()));
        return dto;
    }
} 