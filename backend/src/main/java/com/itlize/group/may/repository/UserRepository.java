package com.itlize.group.may.repository;

import com.itlize.group.may.Entity.sysUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<sysUser, Integer> {
    sysUser findByUserName(String username);
}
