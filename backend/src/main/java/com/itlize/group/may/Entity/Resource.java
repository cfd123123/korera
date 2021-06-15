package com.itlize.group.may.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resource_id;

    private Timestamp time_created;

    private Timestamp last_updated;

    @OneToMany (mappedBy="resource",
            fetch = FetchType.EAGER,
            cascade=CascadeType.ALL)
    @JsonIgnore
    private Set<ProjectResources> projectResources = new HashSet<>();

    @OneToMany( mappedBy = "resource",
            fetch = FetchType.EAGER,
            cascade=CascadeType.ALL)
    private Set<ResourcesDetails> resourcesDetails;

    public Set<ResourcesDetails> getResourcesDetails() {
        return resourcesDetails;
    }

    public void setResourcesDetails(Set<ResourcesDetails> resourcesDetails) {
        this.resourcesDetails = resourcesDetails;
    }

    public Resource() {
    }

    public Resource(Integer resource_id) {
        this.resource_id = resource_id;
    }

    public Integer getResource_id() {
        return resource_id;
    }

    public Timestamp getTime_created() {
        return time_created;
    }

    public Timestamp getLast_updated() {
        return last_updated;
    }

    public void setResource_id(Integer resource_id) {
        this.resource_id = resource_id;
    }

    public void setTime_created(Timestamp time_created) {
        this.time_created = time_created;
    }

    public void setLast_updated(Timestamp last_updated) {
        this.last_updated = last_updated;
    }

    public Set<ProjectResources> getProjectResources() {
        return projectResources;
    }

    public void setProjectResources(Set<ProjectResources> projectResources) {
        this.projectResources = projectResources;
    }

    @Override
    public String toString() {
        return "Resource{" +
                "resource_id=" + resource_id +
                ", time_created=" + time_created +
                ", last_updated=" + last_updated +
                ", projectResources=" + projectResources +
                ", resourcesDetails=" + resourcesDetails +
                '}';
    }
}
