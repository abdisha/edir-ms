package com.edir.app.edir.domain.entity;


import com.edir.app.shared.domain.valueobjects.Age;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.Gender;
import com.edir.app.edir.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
class EdirMember {
    private MemberId memberId;
    private FullName fullName;
    private Age age;
    private Gender gender;
    private Boolean isActive;
    private ZonedDateTime joined;
    private ZonedDateTime Left;
    private Boolean isDeceased;

}
