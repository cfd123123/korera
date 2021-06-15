package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.sysUser;

import java.util.List;

public interface UserService {

    public sysUser findOneById(Integer id);

    public sysUser findByUserName(String username);


    public sysUser getUserById(Integer id);

    public sysUser updateUser(sysUser user);

    public void deleteById(Integer id);

    public sysUser saveUser(sysUser user);

    public List<sysUser> findAll();
}
