package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.edir.domain.valueobjects.EdirName;
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
        super(edirId);
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

       super(id);
        Objects.requireNonNull(id,"Id cannot be null");
        Objects.requireNonNull(edirName,"Edir name cannot be null");
        Objects.requireNonNull(about,"About cannot be null");
        Objects.requireNonNull(phoneNumber,"Phone number cannot be null");
        Objects.requireNonNull(address,"Address cannot be null");


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
                                 ){
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
                                      Address address){
        Objects.requireNonNull(edirName,"Edir name cannot be null");
        Objects.requireNonNull(about,"About cannot be null");
        Objects.requireNonNull(phoneNumber,"Phone number cannot be null");
        Objects.requireNonNull(address,"Address cannot be null");

        this.edirName = edirName;
        this.about = about;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public void registerMember(EdirMember member) {
        edirMembers.add(member);
    }

    public void updateMember(EdirMember member) {
        edirMembers.remove(member);
        edirMembers.add(member);
    }

    public void removeMember(MemberId memberId) {
        edirMembers.remove(findMemberById(memberId));
    }

    public Boolean containMember(MemberId memberId){
        return edirMembers.stream()
                .anyMatch(member ->
                        member.getId()
                                .equals(memberId));
    }

    public void appointDirectory(MemberId memberId){
        EdirMember edirMember =  findMemberById(memberId);
        directorId =edirMember.getId();
    }

    public void appointSecretary(MemberId memberId){
        EdirMember edirMember =  findMemberById(memberId);
        secretaryId =edirMember.getId();
    }

    public void appointTreasurer(MemberId memberId){
        EdirMember edirMember =  findMemberById(memberId);
        treasurerId =edirMember.getId();
    }

    public void marksMemberAsDeceased(MemberId memberId) {
        edirMembers.stream().filter(id -> id.getId()
                .equals(memberId)).forEach(EdirMember::markAsDeceased);
    }

    private EdirMember findMemberById(MemberId memberId) {
        return edirMembers.stream()
                .filter(m->m.equals(memberId))
                                .findFirst().orElseThrow();
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
