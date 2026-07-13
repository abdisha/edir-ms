package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.exceptions.MemberIsAlreadyLeadershipException;
import com.edir.app.edir.domain.exceptions.MemberAlreadyRegisteredException;
import com.edir.app.edir.domain.exceptions.MemberInActiveException;
import com.edir.app.edir.domain.exceptions.MemberNotFoundException;
import com.edir.app.edir.domain.valueobjects.*;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;

import java.util.HashSet;
import java.util.Objects;
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

    private final Set<EdirMember> edirMembers = new HashSet<>();

    Edir(EdirId edirId,
         EdirName edirName,
         String about,
         Address address,
         PhoneNumber phoneNumber,
         MemberId directorId,
         MemberId secretaryId,
         MemberId treasurerId,
         Set<EdirMember> edirMembers) {
        super(Objects.requireNonNull(edirId,"Id cannot be null"));
        this.edirName = edirName;
        this.about = about;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.directorId = directorId;
        this.secretaryId = secretaryId;
        this.treasurerId = treasurerId;
        this.edirMembers.addAll(edirMembers);
    }

    private Edir(EdirId id,
                 EdirName edirName,
                 String about,
                 Address address,
                 PhoneNumber phoneNumber) {

        super(Objects.requireNonNull(id, "Id cannot be null"));
        Objects.requireNonNull(edirName, "Edir name cannot be null");
        Objects.requireNonNull(about, "About cannot be null");
        Objects.requireNonNull(phoneNumber, "Phone number cannot be null");
        Objects.requireNonNull(address, "Address cannot be null");


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

    public static Edir rehydrate(EdirId edirId,
                                 EdirName edirName,
                                 String about,
                                 Address address,
                                 PhoneNumber phoneNumber,
                                 MemberId directorId,
                                 MemberId secretaryId,
                                 MemberId treasurerId,
                                 Set<EdirMember> edirMembers
    ) {
        return new Edir(edirId,
                edirName,
                about,
                address,
                phoneNumber,
                directorId,
                secretaryId,
                treasurerId,
                edirMembers);
    }

    public void updateEdirInformation(EdirName edirName,
                                      String about,
                                      PhoneNumber phoneNumber,
                                      Address address) {
        Objects.requireNonNull(edirName, "Edir name cannot be null");
        Objects.requireNonNull(about, "About cannot be null");
        Objects.requireNonNull(phoneNumber, "Phone number cannot be null");
        Objects.requireNonNull(address, "Address cannot be null");

        this.edirName = edirName;
        this.about = about;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public void registerMember(EdirMember member) {
        if (isActiveMember(member.getId())) {
            throw new MemberAlreadyRegisteredException(member.getId());
        }
        edirMembers.add(member);
    }

    public void appointMember(MemberId memberId, MemberRole memberRole) {
        validateLeaderShipCandidate(memberId);
        ensureLeadershipPositionAvailable(memberId);
        switch (memberRole) {
            case DIRECTOR -> directorId = memberId;
            case SECRETARY -> secretaryId= memberId;
            case TREASURER -> treasurerId = memberId;
        }
    }

    public void revokeAppointment(MemberId memberId) {
        validateLeaderShipCandidate(memberId);

        revokeLeaderShipRole(memberId);
    }

    private void revokeLeaderShipRole(MemberId memberId) {
        if (memberId.equals(directorId)) {
            directorId = null;
        }
        if (memberId.equals(secretaryId)) {
            secretaryId = null;
        }
        if (memberId.equals(treasurerId)) {
            treasurerId = null;
        }
    }

    public void markMemberAsDeceased(MemberId memberId) {
        EdirMember member = findMemberById(memberId);
        member.markAsDeceased();

        revokeLeaderShipRole(memberId);
    }

    private void validateLeaderShipCandidate(MemberId memberId){
        if (!isActiveMember(memberId)){
            throw new MemberInActiveException(memberId);
        }
    }
    private void ensureLeadershipPositionAvailable(MemberId memberId) {

        if (memberId.equals(directorId)
                || memberId.equals(secretaryId)
                || memberId.equals(treasurerId)) {
            throw new MemberIsAlreadyLeadershipException(memberId);
        }
    }

    private boolean isActiveMember(MemberId memberId) {
        return edirMembers.stream()
                .anyMatch(member ->
                        member.getId()
                                .equals(memberId)
                                && member.getActive().equals(MemberStatus.ACTIVE));
    }

    private EdirMember findMemberById(MemberId memberId) {
        return edirMembers.stream()
                .filter(m -> m.getId().equals(memberId))
                .findFirst()
                .orElseThrow(() -> new MemberNotFoundException(memberId));
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
        return Set.copyOf(edirMembers);
    }


}
