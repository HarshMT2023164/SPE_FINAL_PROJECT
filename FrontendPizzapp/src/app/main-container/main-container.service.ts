import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { User } from "./user-details/user.model";
import { Pizza } from "./pizza-list/pizza.model";
import { Cart } from "./cart/cart.model";
import { Order } from "./history/order.model";
import { PizzaListResponse } from "./models/response.model";
import { Login } from "./login/login.model";

@Injectable()
export class MainService {
    //  BASE_URL = "https://inspired-stunning-sawfish.ngrok-free.app";
    BASE_URL = "http://localhost:8085"
    constructor(private http : HttpClient) {}   
    selectedPizzaList = new BehaviorSubject<Pizza[]>([]);
    addPizzaToCart  = new Subject<Pizza>();
    getPizzaList(){
        return this.http.get<PizzaListResponse>(this.BASE_URL + '/pizza/pizzas',{
            headers: {
                'ngrok-skip-browser-warning': 'true',
            }
        }).pipe(map((response : PizzaListResponse)=> response));
    }
    addUser(user : User){
        return this.http.post<User>(this.BASE_URL + '/pizza/user' , user,{
            headers : {
                'ngrok-skip-browser-warning': 'true',
            }
        }).pipe(map(res => res));
    }

    loginUser(user : Login){
        return this.http.post<Login>(this.BASE_URL + '/pizza/login' , user,{
            headers : {
                'ngrok-skip-browser-warning': 'true',
            }
        }).pipe(map(res => res));
    }

    // addUser(user : User){
    //     return this.http.put<User>('https://pizza-app-d893a-default-rtdb.firebaseio.com/user.json' , user).pipe(map(res => res));
    // }
    fetchUser(){
        return this.http.get<User>('https://pizza-app-d893a-default-rtdb.firebaseio.com/user.json').pipe(map(res => res));
    }
    signOutUser(){
        return this.http.delete<User>('https://pizza-app-d893a-default-rtdb.firebaseio.com/user.json').pipe(map(res => res));
    }
    // saveCart(cart : Cart[]){
    //     return this.http.put<Cart[]>('https://pizza-app-d893a-default-rtdb.firebaseio.com/cart.json', cart ).pipe(map(res => res));
    // }

    saveCart(cart : Cart[]){
       const userId = localStorage.getItem("userId");
        return this.http.post<Cart[]>(this.BASE_URL + `/pizza/sendOrder?userId=${userId}`, cart,{
            headers : {
                'ngrok-skip-browser-warning': 'true',
            }
        } ).pipe(map(res => res));
    }


    saveCartOrder(orderList : Order[]){
        return this.http.put<Order[]>('https://pizza-app-d893a-default-rtdb.firebaseio.com/orderList.json' , orderList).pipe(map(res => res));
    }
    fetchCartOrder(){
        const userId = localStorage.getItem("userId");
        return this.http.get<Order[]>(this.BASE_URL + `/pizza/pastOrders?userId=${userId}`,{
            headers : {
                'ngrok-skip-browser-warning': 'true',
            }
        }).pipe(map((res) => res));
    }
    fetchCart(){
        return this.http.get<Cart[]>('https://pizza-app-d893a-default-rtdb.firebaseio.com/cart.json').pipe(map(res => res))
    }
    clearCart(){
        return this.http.delete('https://pizza-app-d893a-default-rtdb.firebaseio.com/cart.json').pipe(map((res) => res));
    }
}