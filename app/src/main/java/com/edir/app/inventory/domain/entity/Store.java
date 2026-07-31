package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.Objects;

public class Store extends BaseEntity<StoreId> {
    private String name;
    private final String location;
    private MemberId storeOwner;

    public Store(StoreId storeId,
                 String name,
                 String location,
                 MemberId storeOwner) {
        super(storeId);
        this.name = Objects.requireNonNull(name,"Store name can not be empty" );
        this.location = location;
        this.storeOwner = Objects.requireNonNull(storeOwner,"Store owner can not be empty");
    }

    public static Store register(String name,
                                 String location,
                                 MemberId storeOwner) {
        return new Store(StoreId.generateId(),
            name,
            location,
            storeOwner);
    }

    public static Store rehydrate(StoreId storeId,
                                  String name,
                                  String location,
                                  MemberId storeOwner){
        return new Store(
            storeId,
            name,
            location,
            storeOwner
        );
    }

    public void changeName(String name){
        this.name = name;
    }

    public void changeOwner(MemberId memberId){
        if(storeOwner!=memberId){
            this.storeOwner = memberId;
        }
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public MemberId getStoreOwner() {
        return storeOwner;
    }
}
