package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

class Edir extends AggregateRoot<EdirId> {
    private EdirName edirName;
    private Address address;
    private PhoneNumber phoneNumber;
    private MemberId directorId;
    private MemberId secretaryId;
    private MemberId treasurerId;
    private Set<EdirMember> edirMemebersSet = new HashSet<>();

    public Edir(EdirId id, EdirName edirName, Address address, PhoneNumber phoneNumber, MemberId directorId, MemberId secretaryId, MemberId treasurerId) {
        this.setId(EdirId.generateId()); // Set the ID inherited from BaseEntity
        this.edirName = edirName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.directorId = directorId;
        this.secretaryId = secretaryId;
        this.treasurerId = treasurerId;
    }

    public void registerNewMember(EdirMember member){
        edirMemebersSet.add(member);
    }
    public void updateMember(EdirMember member){
        edirMemebersSet.remove(member);
        edirMemebersSet.add(member);
    }
    public void MemberDeceased(MemberId memberId){
        edirMemebersSet.stream().filter(id->id.getId()
                .equals(memberId)).forEach(EdirMember::markAsDeceased);
    }

    public void MemberLeft(MemberId memberId){
        edirMemebersSet.stream().filter(id->id.getId().equals(memberId)).forEach(EdirMember::markAsLeft);
    }

    public EdirName getEdirName() {
        return edirName;
    }

    public Address getAddress() {
        return address;
    }

    public PhoneNumber getPhoneNumber() {
        return phoneNumber;
    }

    public MemberId getDirectorId() {
        return directorId;
    }

    public MemberId getSecretaryId() {
        return secretaryId;
    }

    public MemberId getTreasurerId() {
        return treasurerId;
    }

    public Set<EdirMember> getEdirMemebersSet() {
        return edirMemebersSet.stream().collect(Collectors.toUnmodifiableSet());
    }
}
