package com.itlize.group.may.Entity;

public enum Role {
    Customer("Customer"),
    Manager("Manager"),
    Admin("Admin");

    private String role;


    Role(String role) {
        this.role = role;

    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
