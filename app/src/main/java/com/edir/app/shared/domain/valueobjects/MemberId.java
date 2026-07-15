package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;
import java.util.UUID;

public record MemberId(UUID value) {
    public MemberId{
        Objects.requireNonNull(value,"MemberId cannot be null!.");
    }
    public static MemberId generateId(){
        return new MemberId(UUID.randomUUID());
    }

}
