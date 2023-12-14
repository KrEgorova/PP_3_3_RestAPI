package ru.kata.spring.boot_security.demo.exception;

public class UnavailableUsernameException extends RuntimeException {
    public UnavailableUsernameException(String message) {
        super(message);
    }
}