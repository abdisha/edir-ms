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

public class Edir extends AggregateRoot<EdirId> {
    private EdirName edirName;
    private String about;
    private Address address;
    private PhoneNumber phoneNumber;
    private MemberId directorId;
    private MemberId secretaryId;
    private MemberId treasurerId;
    private Set<EdirMember> edirMembers = new HashSet<>();

    protected Edir(EdirId id,
                   EdirName edirName,
                   String about,
                   Address address,
                   PhoneNumber phoneNumber) {
        this.setId(id);
        this.about = about;
        this.edirName = edirName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public static Edir register(EdirName edirName,
                                String about,
                                Address address,
                                PhoneNumber phoneNumber) {

        return new Edir(EdirId.generateId(),
                edirName,
                about,
                address,
                phoneNumber);
    }

    public void registerNewMember(EdirMember member) {
        edirMembers.add(member);
    }

    public void updateMember(EdirMember member) {
        edirMembers.remove(member);
        edirMembers.add(member);
    }

    public void MemberDeceased(MemberId memberId) {
        edirMembers.stream().filter(id -> id.getId()
                .equals(memberId)).forEach(EdirMember::markAsDeceased);
    }

    public void MemberLeft(MemberId memberId) {
        edirMembers.stream().filter(id -> id.getId().equals(memberId)).forEach(EdirMember::markAsLeft);
    }

    public static EdirBuilder builder() {
        return new EdirBuilder();
    }
    public static final class EdirBuilder {
        private EdirName edirName;
        private String about;
        private Address address;
        private PhoneNumber phoneNumber;
        private MemberId directorId;
        private MemberId secretaryId;
        private MemberId treasurerId;
        private Set<EdirMember> edirMemebersSet;
        private EdirId id;

        private EdirBuilder() {
        }



        public EdirBuilder edirName(EdirName edirName) {
            this.edirName = edirName;
            return this;
        }

        public EdirBuilder about(String about) {
            this.about = about;
            return this;
        }

        public EdirBuilder address(Address address) {
            this.address = address;
            return this;
        }

        public EdirBuilder phoneNumber(PhoneNumber phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public EdirBuilder directorId(MemberId directorId) {
            this.directorId = directorId;
            return this;
        }

        public EdirBuilder secretaryId(MemberId secretaryId) {
            this.secretaryId = secretaryId;
            return this;
        }

        public EdirBuilder treasurerId(MemberId treasurerId) {
            this.treasurerId = treasurerId;
            return this;
        }

        public EdirBuilder edirMemebersSet(Set<EdirMember> edirMemebersSet) {
            this.edirMemebersSet = edirMemebersSet;
            return this;
        }

        public EdirBuilder id(EdirId id) {
            this.id = id;
            return this;
        }

        public Edir build() {
            Edir edir = new Edir(null, edirName, about, address, phoneNumber);
            edir.setId(id);
            edir.secretaryId = this.secretaryId;
            edir.edirMembers = this.edirMemebersSet;
            edir.directorId = this.directorId;
            edir.treasurerId = this.treasurerId;
            return edir;
        }
    }


    public EdirName getEdirName() {
        return edirName;
    }

    public String getAbout() {
        return about;
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

    public Set<EdirMember> getEdirMembers() {
        return edirMembers.stream().collect(Collectors.toUnmodifiableSet());
    }


}
