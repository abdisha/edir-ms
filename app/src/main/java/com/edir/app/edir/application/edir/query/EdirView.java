package com.edir.app.edir.application.edir.query;

import java.util.UUID;

public record EdirView(UUID uuid,
                       String edirName,
                       String description,
                       String city,
                       String subcity,
                       String worda,
                       String phoneNumber,
                       Long membersCount

) {
}
