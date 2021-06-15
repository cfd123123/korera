package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Role;
import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.Service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {

    @Autowired
    private UserService service;
    @Test
    void saveUser() {
        sysUser user = new sysUser();
        user.setUserName("Willam");
        user.setPassword("123456");
        user.setRole(Role.Customer);
        service.saveUser(user);
        System.out.println(user);
    }
}