package com.edir.app.edir.domain.entity;


import com.edir.app.edir.domain.valueobjects.MemberStatus;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.*;
import com.edir.app.edir.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
import java.util.Objects;

public class EdirMember extends BaseEntity<MemberId> {
    private FullName fullName;
    private Age age;
    private Gender gender;
    private MemberStatus memberStatus;
    private Address address;
    private PhoneNumber phoneNumber;
    private ZonedDateTime joined;
    private ZonedDateTime Left;
    private Boolean isDeceased;


    private EdirMember(MemberId memberId,
                       FullName fullName,
                       Age age,
                       Gender gender,
                       MemberStatus memberStatus,
                       Address address,
                       PhoneNumber phoneNumber,
                       ZonedDateTime joined,
                       ZonedDateTime left,
                       Boolean isDeceased) {
        super(memberId);
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.memberStatus = memberStatus;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.joined = joined;
        Left = left;
        this.isDeceased = isDeceased;
    }

    private EdirMember(MemberId id,
                       FullName fullName,
                       Age age,
                       Gender gender,
                       Address address,
                       PhoneNumber phoneNumber) {
        super(id);
        Objects.requireNonNull(id, "Id cannot be null");
        Objects.requireNonNull(id, "Id cannot be null");
        Objects.requireNonNull(fullName, "Full name cannot be null");
        Objects.requireNonNull(age, "Age cannot be null");
        Objects.requireNonNull(gender, "Gender cannot be null");
        Objects.requireNonNull(address, "Address cannot be null");
        Objects.requireNonNull(phoneNumber, "Phone number cannot be null");

        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.memberStatus = MemberStatus.ACTIVE;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.joined = ZonedDateTime.now();
        this.isDeceased = false;
    }

    public static EdirMember register(FullName fullName,
                                      Age age,
                                      Gender gender,
                                      Address address,
                                      PhoneNumber phoneNumber) {

        return new EdirMember(MemberId.generateId(),
                fullName,
                age,
                gender,
                address,
                phoneNumber);
    }

    public static EdirMember rehydrate(
            MemberId id,
            FullName fullName,
            Age age,
            Gender gender,
            Address address,
            PhoneNumber phoneNumber,
            MemberStatus memberStatus,
            ZonedDateTime joined,
            ZonedDateTime left,
            Boolean isDeceased
    ) {
        return new EdirMember(
                id,
                fullName,
                age,
                gender,
                memberStatus,
                address,
                phoneNumber,
                joined,
                left,
                isDeceased
        );
    }

    public void markAsDeceased() {
        this.isDeceased = true;
        memberStatus = MemberStatus.INACTIVE;
        Left = ZonedDateTime.now();
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
