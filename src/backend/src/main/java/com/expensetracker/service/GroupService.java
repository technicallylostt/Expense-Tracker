package com.expensetracker.service;

import com.expensetracker.dto.GroupDTO;
import java.util.List;

public interface GroupService {
    GroupDTO createGroup(GroupDTO groupDTO);
    GroupDTO updateGroup(Long id, GroupDTO groupDTO);
    void deleteGroup(Long id, Long userId);
    GroupDTO getGroupById(Long id, Long userId);
    List<GroupDTO> getGroupsByUser(Long userId);
} 