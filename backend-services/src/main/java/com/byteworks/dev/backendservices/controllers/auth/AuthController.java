package com.byteworks.dev.backendservices.controllers.auth;


import com.byteworks.dev.backendservices.dtos.requests.UserLoginDto;
import com.byteworks.dev.backendservices.dtos.response.ApiResponse;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;
import com.byteworks.dev.backendservices.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponseDto>> login(@RequestBody UserLoginDto loginDto){
        return ResponseEntity.ok().body( new ApiResponse<>("login successful", true, userService.login(loginDto)));
    }
}
