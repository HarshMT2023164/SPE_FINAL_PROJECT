package com.pizzzaa.pizzaproject.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("could not found user with id "+id);
    }
}
