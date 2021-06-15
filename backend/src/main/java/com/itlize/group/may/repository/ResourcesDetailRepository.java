package com.itlize.group.may.repository;


import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourcesDetailRepository extends JpaRepository<ResourcesDetails, Integer> {

}
