package com.itlize.group.may.Service;

import com.itlize.group.may.Entity.ProjectColumns;

public interface ProjectColumnService {
    public ProjectColumns addNewColumn(ProjectColumns projectColumn);

    public void DeleteColumn(Integer id);
}
