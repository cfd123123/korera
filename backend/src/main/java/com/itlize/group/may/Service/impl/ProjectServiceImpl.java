package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Service.ProjectService;
import com.itlize.group.may.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository repository;


    @Override
    public Project getProjectById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Project getProjectByCode(BigInteger code){
        return repository.findByProjectCode(code);
    }

    @Override
    public Project updateProject(Project project) {
        return repository.save(project);
    }

    @Override
    public void deleteProjectById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Project createProject(Project project) {
        return repository.saveAndFlush(project);
    }

    @Override
    public List<Project> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Project> getProjectsByUserId(Integer id) {
        List<Project> projects = repository.findAll();
        List<Project> res = new ArrayList<>();
        for(Project project : projects){
            if(project.getUser().getId() == id){
                res.add(project);
            }
        }
        return res;
    }
}
