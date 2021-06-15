package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.Project;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;


public interface ProjectService {
    //shift F6

    public Project getProjectById(Integer id);

    public Project getProjectByCode(BigInteger code);

    public Project updateProject(Project project);

    public void deleteProjectById(Integer id);

    public Project createProject(Project project);

    public List<Project> findAll();

    public List<Project> getProjectsByUserId(Integer id);
}
