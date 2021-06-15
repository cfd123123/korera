package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.ProjectResources;
import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;
import com.itlize.group.may.Service.ProjectResourceService;
import com.itlize.group.may.repository.ProjectResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectResourceServiceImpl implements ProjectResourceService {

    @Autowired
    ProjectResourceRepository repository;


    @Override
    public ProjectResources addProjectResource(ProjectResources pr) {
        return repository.save(pr);
    }

    @Override
    public void deleteResourceById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<ProjectResources> getAllProjectResource() {
        return repository.findAll();
    }

}
