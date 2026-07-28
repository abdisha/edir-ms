package com.edir.app.user.domain;

import java.util.UUID;

public record Role(UUID id, String name) {
     public Role{
         if (!name.startsWith("ROLE_")) {
             name = "ROLE_" + name.toUpperCase();
         } else {
             name = name.toUpperCase();
         }
     }



}
