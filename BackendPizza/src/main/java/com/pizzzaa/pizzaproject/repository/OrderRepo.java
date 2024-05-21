package com.pizzzaa.pizzaproject.repository;

import com.pizzzaa.pizzaproject.model.PizzaOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<PizzaOrder, Long> {
}
