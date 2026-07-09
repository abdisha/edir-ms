package com.edir.app.edir.adapter.persistance;

import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import com.edir.app.edir.adapter.persistance.entity.MemberEntity;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.entity.EdirMember;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.shared.domain.valueobjects.Age;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class EdirMapper {

    public Edir edirEntityToEdir(EdirEntity edirEntity) {
        return Edir.builder()
                .id(new EdirId(edirEntity.getId()))
                .edirName(new EdirName(edirEntity.getName()))
                .about(edirEntity.getName())
                .address(
                        new Address(
                                edirEntity.getCity(),
                                edirEntity.getSubCity(),
                                edirEntity.getWorda()
                        )
                )
                .directorId(new MemberId(edirEntity.getDirector()))
                .treasurerId(new MemberId(edirEntity.getTreasurer()))
                .secretaryId(new MemberId(edirEntity.getSecretary()))
                .phoneNumber(new PhoneNumber(edirEntity.getPhoneNumber()))
                .edirMemebersSet(toEdirMembers(edirEntity.getMembers()))
                .build();
    }

    private Set<EdirMember> toEdirMembers(List<MemberEntity> members) {
        return members.stream().map(
                memberEntity -> EdirMember.builder()
                        .id(new MemberId(memberEntity.getId()))
                        .fullName(new FullName(
                                        memberEntity.getFirstName(),
                                        memberEntity.getMiddleName(),
                                        memberEntity.getLastName()
                        ))
                        .age(new Age(memberEntity.getAge()))
                        .gender(memberEntity.getGender())
                        .address(
                                new Address(
                                        memberEntity.getCity(),
                                        memberEntity.getSubCity(),
                                        memberEntity.getWorda())
                        ).phoneNumber(new PhoneNumber(memberEntity.getPhoneNumber()))
                        .joined(memberEntity.getJoinedDate())
                        .isDeceased(memberEntity.getIsDeceased())
                        .memberStatus(memberEntity.getMemberStatus()).build()
        ).collect(Collectors.toSet());
    }


    public  EdirEntity edirToEdirEntity(Edir edir) {
        return EdirEntity.builder()
                .id(edir.getId().value())
                .name(edir.getEdirName().name())
                .description(edir.getAbout())
                .phoneNumber(edir.getPhoneNumber().phoneNumber())
                .members(
                        edir.getEdirMembers().stream().map(
                                member -> MemberEntity.builder()
                                        .id(member.getId().value())
                                        .firstName(member.getFullName().firstName())
                                        .middleName(member.getFullName().middle())
                                        .lastName(member.getFullName().lastName())
                                        .age(member.getAge().age())
                                        .gender(member.getGender())
                                        .joinedDate(member.getJoined())
                                        .leftDate(member.getLeft())
                                        .isDeceased(member.getDeceased())
                                        .memberStatus(member.getActive())
                                        .phoneNumber(member.getPhoneNumber().phoneNumber())
                                        .city(member.getAddress().city())
                                        .subCity(member.getAddress().subCity())
                                        .worda(member.getAddress().worda())
                                        .build()
                        ).collect(Collectors.toList())

                )
                .director(edir.getDirectorId().value())
                .treasurer(edir.getTreasurerId().value())
                .secretary(edir.getSecretaryId().value())
                .city(edir.getAddress().city())
                .subCity(edir.getAddress().subCity())
                .worda(edir.getAddress().worda())
                .build();
    }

}
