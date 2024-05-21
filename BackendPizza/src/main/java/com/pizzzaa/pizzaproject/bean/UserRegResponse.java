package com.pizzzaa.pizzaproject.bean;

import com.pizzzaa.pizzaproject.model.User;
import lombok.Data;

@Data
public class UserRegResponse {
    private String msg;
    private User user;

    public UserRegResponse(String msg, User user) {
        this.msg = msg;
        this.user = user;
    }
}
