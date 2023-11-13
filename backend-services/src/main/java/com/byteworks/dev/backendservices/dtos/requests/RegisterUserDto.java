package com.byteworks.dev.backendservices.dtos.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

}
