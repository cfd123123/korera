package com.itlize.group.may.repository;

import com.itlize.group.may.Entity.ProjectColumns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectColumnRepository extends JpaRepository<ProjectColumns, Integer> {
}
