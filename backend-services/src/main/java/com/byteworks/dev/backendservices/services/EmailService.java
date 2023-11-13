package com.byteworks.dev.backendservices.services;

import com.byteworks.dev.backendservices.dtos.MailDto;
import org.springframework.http.ResponseEntity;

public interface EmailService {
    ResponseEntity<String> sendMail(MailDto mailDto);

}
