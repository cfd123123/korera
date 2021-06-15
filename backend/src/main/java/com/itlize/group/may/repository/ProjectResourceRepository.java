package com.itlize.group.may.repository;

import com.itlize.group.may.Entity.ProjectResources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectResourceRepository extends JpaRepository<ProjectResources,Integer> {
}
