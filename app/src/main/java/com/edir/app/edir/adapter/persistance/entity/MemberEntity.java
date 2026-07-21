package com.edir.app.edir.adapter.persistance.entity;

import com.edir.app.edir.adapter.persistance.converter.GenderConverter;
import com.edir.app.edir.adapter.persistance.converter.MemberStatusConverter;
import com.edir.app.edir.domain.valueobjects.MemberStatus;
import com.edir.app.shared.domain.valueobjects.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "member", schema = "edir")
public class MemberEntity {
    @Id
    @Column(unique = true)
    private UUID id;
    @Column(length = 100)
    private String firstName;
    @Column(length = 100)
    private String middleName;
    @Column(length = 100)
    private String lastName;
    private Integer age;
    @Convert(converter=GenderConverter.class)
    @Column(length = 1)
    private Gender gender;
    private ZonedDateTime joinedDate;
    private ZonedDateTime leftDate;
    private Boolean isDeceased;
    @Convert(converter = MemberStatusConverter.class)
    @Column(length = 4)
    private MemberStatus memberStatus;
    private String phoneNumber;
    private String city;
    private String subCity;
    private String woreda;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @JoinColumn(name = "edir_id")
    private EdirEntity edir;
}
