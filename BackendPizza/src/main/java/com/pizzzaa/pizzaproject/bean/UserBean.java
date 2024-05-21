package com.pizzzaa.pizzaproject.bean;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserBean {
    private String name;
    private String email;
    private String address;
    private Integer phone;
    private String password;
}
