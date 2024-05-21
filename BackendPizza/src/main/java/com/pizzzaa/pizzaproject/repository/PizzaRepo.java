package com.pizzzaa.pizzaproject.repository;

import com.pizzzaa.pizzaproject.model.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PizzaRepo extends JpaRepository<Pizza,Long> {
}
