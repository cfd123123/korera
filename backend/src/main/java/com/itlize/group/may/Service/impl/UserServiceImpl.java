package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Role;
import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.Service.UserService;
import com.itlize.group.may.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public sysUser findOneById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public sysUser findByUserName(String user_name){
        return repository.findByUserName(user_name);
    }

    /*
    @Override
    public Integer login(String username, String password) {
        return null;
    }
     */

    @Override
    public sysUser getUserById(Integer id) {
        return repository.getOne(id);
    }

    @Override
    public sysUser updateUser(sysUser user) {
        return repository.save(user);
    }

    @Override
    public void deleteById(Integer id){
        repository.deleteById(id);
    }

    @Override
    public sysUser saveUser(sysUser user) {
        user.setPassword( encoder.encode(user.getPassword()));
        user.setPassword(user.getPassword());
        System.out.println("User" + user);
        return repository.save(user);
    }

    @Override
    public List<sysUser> findAll() {
        return repository.findAll();
    }

}
