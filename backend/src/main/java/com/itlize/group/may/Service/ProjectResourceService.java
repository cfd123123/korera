package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.ProjectResources;
import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;

import java.util.List;

public interface ProjectResourceService {

    public ProjectResources addProjectResource(ProjectResources pr);

    public void deleteResourceById(Integer id);

    public List<ProjectResources> getAllProjectResource();

    //public List<ResourcesDetails>  getResourceByProjects(List<Project> projects);
}
