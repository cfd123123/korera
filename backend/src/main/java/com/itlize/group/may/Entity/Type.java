package com.itlize.group.may.Entity;

public enum Type {
    Number("Number"),
    Text("Text"),
    Formula("Formula");

    private String type;

    Type(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
