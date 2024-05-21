package com.pizzzaa.pizzaproject.controller;

import com.pizzzaa.pizzaproject.exception.ResourceNotFoundException;
import com.pizzzaa.pizzaproject.exception.UserNotFoundException;
import com.pizzzaa.pizzaproject.model.Pizza;
import com.pizzzaa.pizzaproject.repository.PizzaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/pizza")
public class PizzaController {
    @Autowired
    private PizzaRepo pizzaRepo;

    @PostMapping("/pizza")
    Pizza addPizza(@RequestBody Pizza newPizza){
        return pizzaRepo.save(newPizza);
    }

    @GetMapping("/pizzas")
    public Map<String,List<Pizza>> getAllPizza(){
        Map<String,List<Pizza>> response = new HashMap<>();
        List<Pizza> pizzas = pizzaRepo.findAll();
        response.put("pizzaList", pizzas);
        return response;
    }
//    List<Pizza> getAllPizza(){
//        return pizzaRepo.findAll();
//    }

    @GetMapping("/pizza/{id}")
    Pizza getPizzaById(@PathVariable Long id){
        return pizzaRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Pizza not found with id "+id));
    }
}
