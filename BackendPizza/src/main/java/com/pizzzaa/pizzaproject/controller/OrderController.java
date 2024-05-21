package com.pizzzaa.pizzaproject.controller;

import com.pizzzaa.pizzaproject.bean.OrderResponse;
import com.pizzzaa.pizzaproject.model.Item;
import com.pizzzaa.pizzaproject.model.PizzaOrder;
import com.pizzzaa.pizzaproject.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pizza")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/sendOrder")
    public ResponseEntity<?> createOrder(@RequestParam(name = "userId") Long userId, @RequestBody List<Item> cartList){
        OrderResponse resp;
        resp = orderService.createOrder(userId,cartList);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping("/pastOrders")
    public ResponseEntity<?> getUserOrders(@RequestParam(name = "userId") Long userId){
        List<PizzaOrder> orders = orderService.getUserOrders(userId);
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }
}
