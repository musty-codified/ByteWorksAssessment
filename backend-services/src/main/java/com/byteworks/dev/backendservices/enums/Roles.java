package com.byteworks.dev.backendservices.enums;

import com.google.common.collect.Sets;

import java.util.Set;

import static com.byteworks.dev.backendservices.enums.Authorities.*;

public enum Roles {
    ROLE_USER(Sets.newHashSet(USER_READ, USER_EDIT)),
    ROLE_ADMIN(Sets.newHashSet(USER_READ, USER_EDIT, USER_DELETE));


    public final Set<Authorities> authorities;
    Roles(Set<Authorities> authorities) {
        this.authorities =authorities;
    }

    public Set<Authorities> getAuthorities(){
        return this.authorities;
    }
}
