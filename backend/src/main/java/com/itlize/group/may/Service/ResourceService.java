package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.Project;
import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;

import java.util.List;

public interface ResourceService {
    public Resource getResourceById(Integer id);

    public Resource createResource(Resource resource);

    public List<Resource> getAllResource();

    public void deleteResourceById(Integer id);
}
