package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.Resource;
import com.itlize.group.may.Entity.ResourcesDetails;

import java.util.List;

public interface ResourceDetailService {
    public ResourcesDetails createDetails(ResourcesDetails details);

    //public ResourcesDetails UpdateDetails(ResourcesDetails details);

     public List<ResourcesDetails> getAllDetails();

}
