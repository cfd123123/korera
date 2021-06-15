package com.itlize.group.may.Controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.itlize.group.may.Entity.Role;
import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService service;


    @GetMapping("/users/{id}")
    public sysUser findById(@PathVariable("id") Integer id){
        return service.findOneById(id);
    }


    @PostMapping("/users/create")
    public void createUser(@RequestBody sysUser user){
        service.saveUser(user);
    }

    @GetMapping ("/users/findAll")
    public ResponseEntity<List<sysUser>> findAllUsers(){
        List<sysUser> list = service.findAll();
        for(sysUser user : list){
            System.out.println(user.toString());
        }
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/users/deleteUserById/{id}")
    public void deleteUserById(@PathVariable(value = "id") int id){
        service.deleteById(id);
    }

    //seperate
    @PostMapping("users/updateUserNameById")
    @Transactional
    public void updateUserNameById(@RequestParam(value = "id") Integer id,
                           @RequestParam(value = "name") String name){
        sysUser user = service.getUserById(id);
        user.setUserName(name);
        //user.setLast_updated(new Timestamp(System.currentTimeMillis()));
        service.updateUser(user);
    }


    @PostMapping("users/updateUserPasswordById")
    @Transactional
    public void updateUserPasswordById(@RequestParam(value = "id") Integer id,
                           @RequestParam(value = "password") String password){
        sysUser user = service.getUserById(id);
        user.setPassword(password);
        //user.setLast_updated(new Timestamp(System.currentTimeMillis()));
        service.updateUser(user);
    }

/*
    @PutMapping("users/changeRole")
    //@PreAuthorize("hasAuthority('Manager')")
    @PreAuthorize("hasRole('ROLE_Manager')")
    //@Secured({"ROLE_Manager"})
    public void changeRole(@RequestParam(value = "id") Integer id,
                           @RequestParam(value = "role") String role ){
        Role r = Role.valueOf(role);
        sysUser user = service.getUserById(id);
        user.setRole(r);
        service.updateUser(user);
    }
*/
}
