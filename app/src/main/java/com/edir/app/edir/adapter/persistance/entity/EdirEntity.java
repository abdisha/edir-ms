package com.edir.app.edir.adapter.persistance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "edir", schema = "edir")
@Entity()
public class EdirEntity {
    @Id
    private UUID id;
    @Column(length = 100)
    private String name;
    @Column(length = 500)
    private String description;
    private ZonedDateTime establishedDate;
    @Column(length = 50)
    private String city;
    @Column(length = 50)
    private String subCity;
    @Column(length = 50)
    private String woreda;
    private UUID director;
    private UUID secretary;
    private UUID treasurer;
    private String phoneNumber;
    @OneToMany(mappedBy = "edir", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberEntity> members = new ArrayList<>();

}
