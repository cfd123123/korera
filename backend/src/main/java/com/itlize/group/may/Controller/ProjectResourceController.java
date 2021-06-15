package com.itlize.group.may.Controller;

import com.itlize.group.may.Entity.ProjectResources;
import com.itlize.group.may.Service.ProjectResourceService;
import com.itlize.group.may.Service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@CrossOrigin
@RestController
@RequestMapping("/projectResource")
public class ProjectResourceController {
    @Autowired
    ProjectResourceService service;

    @PostMapping("/create")
    public ProjectResources addProjectResource(@RequestBody ProjectResources pr){
        pr.setTime_created(new Timestamp(System.currentTimeMillis()));
        return service.addProjectResource(pr);
    }

    @PostMapping("/delete")
    public void deleteProjectResourceById(@RequestParam Integer id){
        service.deleteResourceById(id);
    }
}
