package com.pizzzaa.pizzaproject.controller;

import com.pizzzaa.pizzaproject.bean.LoginBean;
import com.pizzzaa.pizzaproject.model.User;
import com.pizzzaa.pizzaproject.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/pizza")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginBean loginBean){
        User user = loginService.login(loginBean);
        if(user!=null){
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password");
        }
    }

}
