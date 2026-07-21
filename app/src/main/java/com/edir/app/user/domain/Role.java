package com.edir.app.user.domain;

public record Role(String name) {
     public Role{
         if (!name.startsWith("ROLE_")) {
             name = "ROLE_" + name.toUpperCase();
         } else {
             name = name.toUpperCase();
         }
     }



}
