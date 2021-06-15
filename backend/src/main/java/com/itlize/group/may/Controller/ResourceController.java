

package com.itlize.group.may.Controller;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;
import com.itlize.group.may.Entity.sysUser;
import com.itlize.group.may.Service.*;
import com.itlize.group.may.repository.ResourceRepository;
import com.itlize.group.may.repository.ResourcesDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.jws.Oneway;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    ResourceService resourceService;

    @Autowired
    UserService userService;

    @Autowired
    ProjectService projectService;

    @Autowired
    ProjectResourceService projectResourceService;

    @Autowired
    ResourceDetailService resourceDetailService;

    @Autowired
    ResourceDetailService detailService;

    @Autowired
    ResourcesDetailRepository repository;

    @PostMapping("/create")
    public Resource addNewResource(){//@RequestBody Resource resource){
        Resource resource = new Resource();
        resource.setLast_updated(new Timestamp(System.currentTimeMillis()));
        resource.setTime_created(new Timestamp(System.currentTimeMillis()));
        //resource.getResource_id();
        return resourceService.createResource(resource);
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Resource>> getAllResource(){
        List<Resource> list = resourceService.getAllResource();
        return ResponseEntity.ok(list);
    }

    @GetMapping("getById")
    public Resource getResourcesById(@RequestParam Integer id){
        System.out.println(resourceService.getResourceById(id));
        return resourceService.getResourceById(id);
    }

    /*
    @GetMapping("getByUserId")
    public ResponseEntity<List<ResourcesDetails>> getResourceByUserId(@RequestParam(value = "userId") Integer userId){
        //sysUser user = userService.getUserById(userId);
        List<Project> projects = projectService.getProjectsByUserId(userId);

        //List<ResourcesDetails> list = projectResourceService.getResourceByProjects(projects);
        System.out.println(list);
        return ResponseEntity.ok(list);
    }
*/

    @PostMapping("createResourceDetailById")
    public ResourcesDetails createResourceDetailByResourceId(@RequestBody ResourcesDetails details){
        details.setTime_created(new Timestamp(System.currentTimeMillis()));
        details.setLast_updated(new Timestamp(System.currentTimeMillis()));
        System.out.println(details);
        return detailService.createDetails(details);
    }

    @PostMapping("updateResourceDetailById")
    @Transactional
    public ResourcesDetails updateResourceDetailByResourceId(@RequestBody ResourcesDetails details){
        details.setTime_created(repository.getOne(details.getRecordId()).getTime_created());
        details.setLast_updated(new Timestamp(System.currentTimeMillis()));
        System.out.println(details);
        return repository.save(details);
    }

    @GetMapping("getAllResourceDetail")
    @Transactional
    public ResponseEntity<List<ResourcesDetails>> getAllResourceDetails(){
        List<ResourcesDetails> list = resourceDetailService.getAllDetails();
        System.out.println();
        return ResponseEntity.ok(list);
    }

    @GetMapping("searchByName")                              //@RequestParam(value = "name")
    public ResponseEntity<List<ResourcesDetails>> findByname(@RequestParam(value = "name") String name){
        List<ResourcesDetails> res = new ArrayList();
        List<ResourcesDetails> list = resourceDetailService.getAllDetails();
        for(ResourcesDetails r : list){
            if(r.getColumn_value().replace(" ","").toLowerCase().contains(name.toLowerCase())){
                res.add(r);
            }
        }
        return ResponseEntity.ok(res);
    }

}
