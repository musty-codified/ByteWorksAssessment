package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.requests.ActivateUserDto;
import com.byteworks.dev.backendservices.dtos.requests.RegisterUserDto;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;

public interface UserService {
    UserResponseDto registerUser(RegisterUserDto userDto);
    UserResponseDto activateUser(ActivateUserDto activateUserD);
    String sendToken(String email, String subject);


}
