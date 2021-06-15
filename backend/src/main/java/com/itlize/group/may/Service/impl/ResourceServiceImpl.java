package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Service.ResourceService;
import com.itlize.group.may.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ResourceRepository repository;


    @Override
    public Resource getResourceById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Resource createResource(Resource resource) {
        return repository.save(resource);
    }

    @Override
    public List<Resource> getAllResource() {
        return repository.findAll();
    }

    @Override
    public void deleteResourceById(Integer id) {
        repository.deleteById(id);
    }
}
