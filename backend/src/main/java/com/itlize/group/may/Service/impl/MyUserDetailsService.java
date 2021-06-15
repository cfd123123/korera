package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        sysUser user = repository.findByUserName(s);
        if (user == null) {
            System.out.println("user doesn't exist");
            throw new UsernameNotFoundException("user doesn't exist");
        }

        //List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("Manager");
        System.out.println("username:"+user.getUserName()+";password:"+user.getPassword());
                                                                                      //grantedauthority
        return new User(user.getUserName(),passwordEncoder.encode(user.getPassword()),new ArrayList<>());
    }
    //status 403: No authority
}
