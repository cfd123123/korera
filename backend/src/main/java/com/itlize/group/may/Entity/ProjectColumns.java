package com.itlize.group.may.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "project_columns")
public class ProjectColumns {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer column_id;

    @ManyToOne()
    @JoinColumn(name = "project_id")
    //@JsonIgnore
    private Project project;


    @OneToMany( mappedBy = "projectColumns",
                fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<ResourcesDetails> resourcesDetails;

    private String column_name;

    private String formula_text;

    //@Enumerated(EnumType.ORDINAL)
    @Enumerated(value = EnumType.STRING)
    private Type type;

    public ProjectColumns() {
    }

    public ProjectColumns(Integer column_id) {
        this.column_id = column_id;
    }

    public ProjectColumns(String column_name, Type type) {
        this.column_name = column_name;
        this.type = type;
    }

    public Integer getColumn_id() {
        return column_id;
    }



    public String getColumn_name() {
        return column_name;
    }

    public String getFormula_text() {
        return formula_text;
    }

    public Type getType() {
        return type;
    }

    public void setColumn_id(Integer column_id) {
        this.column_id = column_id;
    }


    public void setColumn_name(String column_name) {
        this.column_name = column_name;
    }

    public void setFormula_text(String formula_text) {
        this.formula_text = formula_text;
    }

    public void setType(Type type) {
        this.type = type;
    }


    public Set<ResourcesDetails> getResourcesDetails() {
        return resourcesDetails;
    }

    public void setResourcesDetails(Set<ResourcesDetails> resourcesDetails) {
        this.resourcesDetails = resourcesDetails;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
