package com.pizzzaa.pizzaproject.repository;

import com.pizzzaa.pizzaproject.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, Long> {
}
