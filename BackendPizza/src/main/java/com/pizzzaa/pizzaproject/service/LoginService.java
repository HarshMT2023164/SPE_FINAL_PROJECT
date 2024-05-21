package com.pizzzaa.pizzaproject.service;

import com.pizzzaa.pizzaproject.bean.LoginBean;
import com.pizzzaa.pizzaproject.model.User;
import com.pizzzaa.pizzaproject.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LoginService {
    @Autowired
    private UserRepo userRepo;

    public User login(LoginBean loginBean){
        log.info("Attempting to log in user with email: {}", loginBean.getUserName());
        User user = userRepo.findByEmail(loginBean.getUserName());
        if(user == null){
            log.warn("No user found with email: {}", loginBean.getUserName());
            return null;
        }
        else if(user != null && user.getPassword().equals(loginBean.getPassword())){
            return user;
        }
        return null;
    }
}
