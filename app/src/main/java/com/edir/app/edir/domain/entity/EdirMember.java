package com.edir.app.edir.domain.entity;


import com.edir.app.edir.domain.valueobjects.MemberStatus;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.*;
import com.edir.app.edir.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
class EdirMember extends BaseEntity<MemberId> {
    private FullName fullName;
    private Age age;
    private Gender gender;
    private MemberStatus memberStatus;
    private Address address;
    private PhoneNumber phoneNumber;
    private ZonedDateTime joined;
    private ZonedDateTime Left;
    private Boolean isDeceased;

    public EdirMember(FullName fullName, Age age, Gender gender,Address address, PhoneNumber phoneNumber) {
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.memberStatus = MemberStatus.ACTIVE;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.joined = ZonedDateTime.now();
        this.isDeceased = false;
    }

    public void markAsDeceased(){
        this.isDeceased = true;
        memberStatus = MemberStatus.INACTIVE;
        Left = ZonedDateTime.now();
    }

    public void markAsLeft(){
        this.memberStatus = MemberStatus.INACTIVE;
        this.Left = ZonedDateTime.now();
    }

    public FullName getFullName() {
        return fullName;
    }

    public Age getAge() {
        return age;
    }

    public Gender getGender() {
        return gender;
    }

    public MemberStatus getActive() {
        return memberStatus;
    }

    public Address getAddress() {
        return address;
    }

    public PhoneNumber getPhoneNumber() {
        return phoneNumber;
    }

    public ZonedDateTime getJoined() {
        return joined;
    }

    public ZonedDateTime getLeft() {
        return Left;
    }

    public Boolean getDeceased() {
        return isDeceased;
    }
}
