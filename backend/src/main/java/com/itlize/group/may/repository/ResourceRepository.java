package com.itlize.group.may.repository;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.Resources;
import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
   // Resource getResourcesById(Integer resource_id);


}
