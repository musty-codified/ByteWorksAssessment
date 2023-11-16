package com.byteworks.dev.backendservices.services.impl;


import com.byteworks.dev.backendservices.dtos.MailDto;
import com.byteworks.dev.backendservices.dtos.requests.ActivateUserDto;
import com.byteworks.dev.backendservices.dtos.requests.RegisterUserDto;
import com.byteworks.dev.backendservices.dtos.requests.UserLoginDto;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;
import com.byteworks.dev.backendservices.entities.User;
import com.byteworks.dev.backendservices.enums.Status;
import com.byteworks.dev.backendservices.exceptions.AuthenticationException;
import com.byteworks.dev.backendservices.exceptions.NotFoundException;
import com.byteworks.dev.backendservices.exceptions.ValidationException;
import com.byteworks.dev.backendservices.repositories.UserRepository;
import com.byteworks.dev.backendservices.security.CustomUserDetailsService;
import com.byteworks.dev.backendservices.security.JwtUtils;
import com.byteworks.dev.backendservices.services.EmailService;
import com.byteworks.dev.backendservices.services.UserService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import com.byteworks.dev.backendservices.utils.LocalStorage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AppUtils appUtil;
    private final LocalStorage memStorage;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtil;

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService customUserDetailsService;

    private static  final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final EmailService emailService;
    @Override
    public UserResponseDto registerUser(RegisterUserDto userDto) {
        if (!appUtil.validEmail(userDto.getEmail()))
            throw new ValidationException("Invalid email");
        if(userRepository.existsByEmail(userDto.getEmail()))
            throw new ValidationException("User already exists");

        User newUser = appUtil.getMapper().convertValue(userDto, User.class);
        newUser.setUuid(appUtil.generateSerialNumber("usr"));
        newUser.setStatus(Status.INACTIVE.name());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));

       newUser = userRepository.save(newUser);

        sendToken(newUser.getEmail(), "activate your account");

        return appUtil.getMapper().convertValue(newUser, UserResponseDto.class);

    }

    @Override
    public UserResponseDto activateUser(ActivateUserDto activateUserDto) {
        validateToken(activateUserDto.getEmail(), activateUserDto.getActivationToken());
       User userToActivate = userRepository.findByEmail(activateUserDto.getEmail())
                .orElseThrow(()-> new NotFoundException("User not found"));

        userToActivate.setStatus(Status.ACTIVE.name());
       UserResponseDto userResponseDto = appUtil.getMapper().convertValue(userToActivate, UserResponseDto.class);
       MailDto mailDto = MailDto.builder()
               .subject("YOUR ACCOUNT IS ACTIVE")
               .body(String.format("Hi %s, \n You have successfully activated your account. Kindly login to start making use of the app.", userResponseDto.getLastName()))
               .to(activateUserDto.getEmail())
               .build();

       emailService.sendMail(mailDto);
        return userResponseDto;
    }

    private void validateToken(String memcachedKey, String value) {
        if(!userRepository.existsByEmail(memcachedKey))
            throw new NotFoundException("User not found");
        if(!appUtil.validEmail(memcachedKey))
            throw new ValidationException("Invalid email");
        if(!memStorage.getValueByKey(memcachedKey).equals(value))
            throw new ValidationException("Invalid token");
        if(memStorage.getValueByKey(memcachedKey) == null)
            throw new ValidationException("Token expired");

    }


    @Override
    public String sendToken(String email, String subject) {
        if (!userRepository.existsByEmail(email))
            throw new NotFoundException("User does not exist");

      String token = appUtil.generateSerialNumber("o");
      memStorage.save(email, token, 900);  //15mins

        MailDto mailDto = MailDto.builder()
                .to(email)
                .body(String.format("Use this token to %s: %s (Expires in 15mins)", subject.toLowerCase(), token))
                .subject(subject.toUpperCase())
                .build();
        emailService.sendMail(mailDto);

        return "Token sent";
    }

    @Override
    public UserResponseDto login(UserLoginDto creds) {
        if(!appUtil.validEmail(creds.getEmail()))
            throw new ValidationException("Invalid email");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword())
            );
            UserResponseDto userResponseDto;

            if (authentication.isAuthenticated()) {
                User user = userRepository.findByEmail(creds.getEmail())
                        .orElseThrow(() -> new BadCredentialsException("Invalid login credentials"));

                if (user.getStatus().equals(Status.INACTIVE.name()))
                    throw new RuntimeException("User not active. Kindly activate your account.");

                LOGGER.info("Generating access token for {}", user.getEmail());
                String accessToken = jwtUtil.generateToken(customUserDetailsService.loadUserByUsername(user.getEmail()));

                user.setLastLoginDate(new Date());

                userResponseDto = appUtil.getMapper().convertValue(user, UserResponseDto.class);
                userResponseDto.setToken(accessToken);
            } else {
                throw new BadCredentialsException("Invalid username or password");
            }
            return userResponseDto;

        } catch (Exception e) {
            throw new AuthenticationException(e.getMessage());
        }
    }


}
