package com.pizzzaa.pizzaproject.repository;

import com.pizzzaa.pizzaproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {

    User findByEmail(String email);
}
