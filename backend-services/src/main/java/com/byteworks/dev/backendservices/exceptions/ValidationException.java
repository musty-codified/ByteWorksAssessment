package com.byteworks.dev.backendservices.exceptions;

public class ValidationException extends RuntimeException{
    private String debugMessage;
    public ValidationException(){
        super();
        this.debugMessage = "Validation failed";
    }

    public ValidationException(String message) {
        super(message);
        this.debugMessage = message;
    }
}
