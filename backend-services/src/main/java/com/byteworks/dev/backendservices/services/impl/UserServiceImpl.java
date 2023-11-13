package com.byteworks.dev.backendservices.services.impl;


import com.byteworks.dev.backendservices.dtos.MailDto;
import com.byteworks.dev.backendservices.dtos.requests.ActivateUserDto;
import com.byteworks.dev.backendservices.dtos.requests.RegisterUserDto;
import com.byteworks.dev.backendservices.dtos.response.UserResponseDto;
import com.byteworks.dev.backendservices.entities.User;
import com.byteworks.dev.backendservices.enums.Status;
import com.byteworks.dev.backendservices.repositories.UserRepository;
import com.byteworks.dev.backendservices.services.EmailService;
import com.byteworks.dev.backendservices.services.UserService;
import com.byteworks.dev.backendservices.utils.AppUtils;
import com.byteworks.dev.backendservices.utils.LocalStorage;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AppUtils appUtil;
    private final LocalStorage memStorage;
    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;
    @Override
    public UserResponseDto registerUser(RegisterUserDto userDto) {
        if (!appUtil.validEmail(userDto.getEmail()))
            throw new RuntimeException("Invalid email");
        if(userRepository.existsByEmail(userDto.getEmail()))
            throw new RuntimeException("User already exists");

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
                .orElseThrow(()-> new RuntimeException("User not found"));

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
            throw new RuntimeException("User not found");
        if(!appUtil.validEmail(memcachedKey))
            throw new RuntimeException("Invalid email");
        if(!memStorage.getValueByKey(memcachedKey).equals(value))
            throw new RuntimeException("Invalid token");
        if(memStorage.getValueByKey(memcachedKey) == null)
            throw new RuntimeException("Token expired");

    }


    @Override
    public String sendToken(String email, String subject) {
        if (!userRepository.existsByEmail(email))
            throw new RuntimeException("User does not exist");

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
}
