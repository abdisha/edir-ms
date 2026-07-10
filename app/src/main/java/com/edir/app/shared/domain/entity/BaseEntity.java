package com.edir.app.shared.domain.entity;

public abstract class BaseEntity<ID> {
    private ID id;

    public ID getId() {
        return id;
    }

    protected BaseEntity(ID id){
        this.id = id;
    }
}
