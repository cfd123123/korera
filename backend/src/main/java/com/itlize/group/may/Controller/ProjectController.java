package com.itlize.group.may.Controller;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.ProjectColumns;
import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.Service.ProjectColumnService;
import com.itlize.group.may.Service.ProjectService;
import com.itlize.group.may.Service.UserService;
import com.itlize.group.may.repository.ProjectColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @Autowired
    private ProjectColumnService columnService;

    @Autowired
    private ProjectColumnRepository projectColumnRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public Project findById(@RequestParam(value="id") Integer id){
        Project res = service.getProjectById(id);
        //System.out.println(res);
        return res;

    }
    @GetMapping("/findByCode")
    public Project findByCode(@RequestParam(value = "code") BigInteger code){

        Project res = service.getProjectByCode(code);
        return res;
    }

    /*
    @PostMapping("/createByUsername")
    public void createProject(@RequestParam("projectName") String projectName,
                              @RequestParam("projectCode") BigInteger projectCode,
                              @RequestParam("userName") String username) throws Exception {
        Project p = new Project(projectCode,projectName);
        sysUser cur_user = userService.findByUserName(username);
        if(cur_user == null){
            throw new Exception("can not find user");
        }
        p.setUser(cur_user);
        service.createProject(p);
        return;
    }
    */

    @PostMapping("/createByUserId")
    public Project createProject(@RequestBody Project project){
        project.setTime_created(new Timestamp(System.currentTimeMillis()));
        System.out.println(project);
        return service.createProject(project);
    }

/*
    @PostMapping("/updateByCode")
    public Project updateNameByCode(@ResourceBody Project
                                ){

        Project p = service.getProjectByCode(code);
        p.setProjectName(name);
        return service.updateProject(p);
    }
*/

    @DeleteMapping("/deleteProjectById/{id}")
    public void deleteProjectById(@PathVariable(value = "id") int id){
        service.deleteProjectById(id);
    }


    @GetMapping ("/findAll")
    @Transactional
    public ResponseEntity<List<Project>> findAllProjects(){
        List<Project> list = service.findAll();
        for(Project project : list){
            System.out.println(project.toString());
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping("/Column/create")
    public ProjectColumns createColumn(@RequestBody ProjectColumns projectColumn) throws Exception {
        if(projectColumnRepository.existsById(projectColumn.getColumn_id())){
            throw new Exception("can not create an existed one");
        }
        return columnService.addNewColumn(projectColumn);
    }

    @PostMapping("/Column/delete")
    public void deleteColumnById(@RequestParam Integer id) {
        columnService.DeleteColumn(id);
    }
}
