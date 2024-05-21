package com.pizzzaa.pizzaproject.controller;

import com.pizzzaa.pizzaproject.bean.UserRegResponse;
import com.pizzzaa.pizzaproject.exception.UserNotFoundException;
import com.pizzzaa.pizzaproject.model.User;
import com.pizzzaa.pizzaproject.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RequestMapping("/pizza")
@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @PostMapping("/user")
    public ResponseEntity<?> newUser(@RequestBody User newUser){
        log.info("anything");
        User savedUser = userRepo.save(newUser);
        if(savedUser != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserRegResponse("User Registered Successfully",savedUser));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
        }
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepo.findById(id)
                .orElseThrow(()-> new UserNotFoundException(id));
    }
}
