package com.edir.app.edir.adapter.persistance;

import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import com.edir.app.edir.adapter.persistance.entity.MemberEntity;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.entity.EdirMember;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.shared.domain.valueobjects.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class EdirMapper {
    public Edir edirEntityToEdir(EdirEntity edirEntity) {
        return Edir.rehydrate(
                new EdirId(edirEntity.getId()),
                new EdirName(edirEntity.getName()),
                edirEntity.getEstablishedDate(),
                edirEntity.getDescription(),
                new Address(
                        edirEntity.getCity(),
                        edirEntity.getSubCity(),
                        edirEntity.getWoreda()),
                new PhoneNumber(edirEntity.getPhoneNumber()),
                edirEntity.getDirector() == null ? null : new MemberId(edirEntity.getDirector()),
                edirEntity.getSecretary() == null ? null : new MemberId(edirEntity.getSecretary()),
                edirEntity.getTreasurer() == null ? null : new MemberId(edirEntity.getTreasurer()),
                toEdirMembers(edirEntity.getMembers())
        );
    }

    private Set<EdirMember> toEdirMembers(List<MemberEntity> members) {
        return members.stream().map(
                memberEntity -> EdirMember.rehydrate(
                        new MemberId(memberEntity.getId()),
                        new FullName(
                                memberEntity.getFirstName(),
                                memberEntity.getMiddleName(),
                                memberEntity.getLastName()
                        ),
                        new Age(memberEntity.getAge()),
                        memberEntity.getGender(),
                        new Address(
                                memberEntity.getCity(),
                                memberEntity.getSubCity(),
                                memberEntity.getWoreda()
                        ),
                        new PhoneNumber(memberEntity.getPhoneNumber()),
                        memberEntity.getMemberStatus(),
                        memberEntity.getJoinedDate(),
                        memberEntity.getLeftDate(),
                        memberEntity.getIsDeceased()

                )
        ).collect(Collectors.toSet());
    }

    public EdirEntity edirToEdirEntity(Edir edir) {
           EdirEntity edirEntity =  EdirEntity.builder()
                .id(edir.getId().value())
                .name(edir.getEdirName().name())
                .establishedDate(edir.getEstablishedDate())
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
                                        .subCity(member.getAddress().subcity())
                                        .woreda(member.getAddress().woreda())
                                        .build()
                        ).collect(Collectors.toList())

                )
                .director(edir.getDirectorId() == null ? null : edir.getDirectorId().value())
                .treasurer(edir.getTreasurerId() == null ? null : edir.getTreasurerId().value())
                .secretary(edir.getSecretaryId() == null ? null : edir.getSecretaryId().value())
                .city(edir.getAddress().city())
                .subCity(edir.getAddress().subcity())
                .woreda(edir.getAddress().woreda())
                .build();

           edirEntity.getMembers().forEach(m->m.setEdir(edirEntity));
           return  edirEntity;
    }

}
