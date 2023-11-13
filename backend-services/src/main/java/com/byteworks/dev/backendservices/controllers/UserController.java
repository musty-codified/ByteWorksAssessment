package com.byteworks.dev.backendservices.controllers;


import com.byteworks.dev.backendservices.dtos.requests.RegisterUserDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;
import com.byteworks.dev.backendservices.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDto>>registerUser(@RequestBody RegisterUserDto userDto){
        UserResponseDto userResponseDto = userService.registerUser(userDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("{uuid}")
                .buildAndExpand(userResponseDto.getUuid())
                .toUri();
        return ResponseEntity.created(location).body(new ApiResponse<>("Signup successful", true, userResponseDto));
    }
}
