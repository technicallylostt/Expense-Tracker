package com.expensetracker.repository;

import com.expensetracker.model.Group;
import com.expensetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByMembersContaining(User user);
    List<Group> findByCreatedBy(User user);
    Optional<Group> findByIdAndMembersContaining(Long id, User user);
    
    @Query("SELECT g FROM Group g WHERE g.createdBy = ?1 OR ?1 MEMBER OF g.members")
    List<Group> findAllGroupsForUser(User user);
    
    boolean existsByNameAndCreatedBy(String name, User user);
} 