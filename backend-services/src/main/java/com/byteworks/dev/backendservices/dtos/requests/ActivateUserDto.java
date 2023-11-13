package com.byteworks.dev.backendservices.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivateUserDto {
    private String email;
    private String activationToken;
}
