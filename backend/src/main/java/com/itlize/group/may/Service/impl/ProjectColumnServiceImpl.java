package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.ProjectColumns;
import com.itlize.group.may.Service.ProjectColumnService;
import com.itlize.group.may.repository.ProjectColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectColumnServiceImpl implements ProjectColumnService{

    @Autowired
    ProjectColumnRepository repository;

    @Override
    public ProjectColumns addNewColumn(ProjectColumns projectColumn) {
        return repository.save(projectColumn);
    }

    @Override
    public void DeleteColumn(Integer id) {
        repository.deleteById(id);
    }
}
