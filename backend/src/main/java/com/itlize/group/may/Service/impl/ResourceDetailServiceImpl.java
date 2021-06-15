package com.itlize.group.may.Service.impl;

import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;
import com.itlize.group.may.Service.ResourceDetailService;
import com.itlize.group.may.repository.ResourcesDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceDetailServiceImpl implements ResourceDetailService {
    @Autowired
    ResourcesDetailRepository repository;

    @Override
    public ResourcesDetails createDetails(ResourcesDetails details) {
        return repository.save(details);
    }

    @Override
    public List<ResourcesDetails> getAllDetails() {
        return repository.findAll();
    }

}
