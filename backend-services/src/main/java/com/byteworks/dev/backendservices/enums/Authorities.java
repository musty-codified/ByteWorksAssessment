package com.byteworks.dev.backendservices.enums;

public enum Authorities {
    USER_READ("user:read"),
    USER_EDIT("user:write"),
    USER_DELETE("user:delete");

    private final String authorities;
    Authorities(String authorities){
        this.authorities = authorities;
    }
    public String getAuthorities() {
        return authorities;
    }
}
