package com.pizzzaa.pizzaproject.service;

import com.pizzzaa.pizzaproject.bean.OrderResponse;
import com.pizzzaa.pizzaproject.model.Item;
import com.pizzzaa.pizzaproject.model.PizzaOrder;
import com.pizzzaa.pizzaproject.model.User;
import com.pizzzaa.pizzaproject.repository.OrderRepo;
import com.pizzzaa.pizzaproject.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Transactional
    public OrderResponse createOrder(Long userId, List<Item> cartList){
        OrderResponse resp = new OrderResponse();
        User user = userRepo.findById(userId)
                .orElseThrow(()-> new RuntimeException("User not Found"));

        PizzaOrder order = new PizzaOrder();
        order.setCartList(cartList);

        orderRepo.save(order);

        user.getOrderList().add(order);
        userRepo.save(user);
        resp.setMsg("SUCCESS");
        resp.setOrderId(order.getId());
        return resp;
    }

    public List<PizzaOrder> getUserOrders(Long userId){
        User user = userRepo.findById(userId)
                .orElseThrow(()->new RuntimeException("user not found"));
        return user.getOrderList();
    }
}
