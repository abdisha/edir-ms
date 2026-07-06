package com.edir.app.edir.domain.entity;

import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.edir.domain.valueobjects.EdirName;

import java.util.HashSet;
import java.util.Set;

class Edir {
    private EdirId id;
    private EdirName edirName;
    private Address address;
    private Set<EdirMember> edirMemebersSet = new HashSet<>();

}
