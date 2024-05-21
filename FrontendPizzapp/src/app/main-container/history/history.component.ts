import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Cart } from '../cart/cart.model';
import { MainService } from '../main-container.service';
import { Pizza } from '../pizza-list/pizza.model';
import { fetchPizzaList } from '../store/pizza.action';
import { selectCart, selectPizzaList } from '../store/pizza.selector';
import { Order, OrderCart } from './order.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orderList: Order[];
  pizzaList: Pizza[] = [];
  constructor(private mainService: MainService, private store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.store.dispatch(fetchPizzaList());
    this.mainService.fetchCartOrder().subscribe((res) => {
      if (res) {
        this.orderList = res;
        console.log(this.orderList);
        this.store.select(selectPizzaList).subscribe((list) => {
          this.pizzaList = list
         
        })
      }
    });

  }
  getPizzaListFromCartMap(cartMap: OrderCart[]) {

    let cartList: Pizza[] = [];
    cartList = this.pizzaList.filter(item => {
      let ispresent: boolean = false
      for (let i = 0; i < cartMap.length; i++) {
        if (cartMap[i].name == item.name)
          ispresent = true
      }
      if (ispresent)
        return true;
      else
        return false;
    });
    return cartList;
  }
  
  getTotalPrice(order: Order) {

    let total = 0;
    let pizzaCartList = this.getPizzaListFromCartMap(order.cartList);
    for (let i = 0; i < order.cartList.length; i++) {
      if (order.cartList[i] && pizzaCartList[i])
        total += order.cartList[i].quantity * pizzaCartList[i].price;
    }
    return total;
  }

}
