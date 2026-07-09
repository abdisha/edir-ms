package com.edir.app.edir.domain.entity;


import com.edir.app.edir.domain.valueobjects.MemberStatus;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.*;
import com.edir.app.edir.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
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

    protected EdirMember(MemberId id,
                      FullName fullName,
                      Age age,
                      Gender gender,
                      Address address,
                      PhoneNumber phoneNumber) {
        this.setId(id);
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.memberStatus = MemberStatus.ACTIVE;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.joined = ZonedDateTime.now();
        this.isDeceased = false;
    }

    public static EdirMember register(  FullName fullName,
                                        Age age,
                                        Gender gender,
                                        Address address,
                                        PhoneNumber phoneNumber){

        return new EdirMember(MemberId.generateId(),
                fullName,
                age,
                gender,
                address,
                phoneNumber);
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
    public static EdirMemberBuilder builder() {
        return new EdirMemberBuilder();
    }
    public static final class EdirMemberBuilder {
        private FullName fullName;
        private Age age;
        private Gender gender;
        private MemberStatus memberStatus;
        private Address address;
        private PhoneNumber phoneNumber;
        private ZonedDateTime joined;
        private ZonedDateTime Left;
        private Boolean isDeceased;
        private MemberId id;

        private EdirMemberBuilder() {
        }



        public EdirMemberBuilder fullName(FullName fullName) {
            this.fullName = fullName;
            return this;
        }

        public EdirMemberBuilder age(Age age) {
            this.age = age;
            return this;
        }

        public EdirMemberBuilder gender(Gender gender) {
            this.gender = gender;
            return this;
        }

        public EdirMemberBuilder memberStatus(MemberStatus memberStatus) {
            this.memberStatus = memberStatus;
            return this;
        }

        public EdirMemberBuilder address(Address address) {
            this.address = address;
            return this;
        }

        public EdirMemberBuilder phoneNumber(PhoneNumber phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public EdirMemberBuilder joined(ZonedDateTime joined) {
            this.joined = joined;
            return this;
        }

        public EdirMemberBuilder Left(ZonedDateTime Left) {
            this.Left = Left;
            return this;
        }

        public EdirMemberBuilder isDeceased(Boolean isDeceased) {
            this.isDeceased = isDeceased;
            return this;
        }

        public EdirMemberBuilder id(MemberId id) {
            this.id = id;
            return this;
        }

        public EdirMember build() {
            EdirMember edirMember = new EdirMember(null, fullName, age, gender, address, phoneNumber);
            edirMember.setId(id);
            edirMember.isDeceased = this.isDeceased;
            edirMember.joined = this.joined;
            edirMember.memberStatus = this.memberStatus;
            edirMember.Left = this.Left;
            return edirMember;
        }
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
