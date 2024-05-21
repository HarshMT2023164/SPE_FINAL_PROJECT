import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Order } from '../history/order.model';
import { MainService } from '../main-container.service';
import { Pizza } from '../pizza-list/pizza.model';
import { clearCart, decreaseCount, fetchCart, removeCartItem, saveCart, updateCart } from '../store/pizza.action';
import { selectUser } from '../store/pizza.selector';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { User } from '../user-details/user.model';
import { Cart } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  addedToCartList: Pizza[] = [];
  cartList: Pizza[] = []
  total: number = 0
  cartMap: Cart[] = [];
  pizzaList: Pizza[];
  orderList: Order[] = [];
  subscriptions: Subscription
  constructor(private mainService: MainService,
    private store: Store<AppState>, private router: Router, public dialog: MatDialog) {
    this.subscriptions = new Subscription();
  }
  tempList: Pizza[] = [];
  ngOnInit(): void {
    // this.store.dispatch(fetchCart());
    this.store.select("pizzaListStore").subscribe((state) => {
      this.cartMap = state.cartMap || [];
      this.pizzaList = state.pizzaList;

      this.cartList = this.pizzaList.filter(item => {
        let ispresent: boolean = false
        for (let i = 0; i < this.cartMap.length; i++) {
          if (this.cartMap[i].name == item.name)
            ispresent = true
        }
        if (ispresent)
          return true;
        else
          return false;
      })

    })
  }
  increment(id: number) {
    this.store.dispatch(updateCart({ name: this.cartMap[id].name }));


  }
  decrement(id: number) {
    let cartMapItem = JSON.parse(JSON.stringify(this.cartMap[id]));
    if (cartMapItem.quantity > 1) {
      cartMapItem.quantity -= 1;
      this.store.dispatch(decreaseCount({ id: id, item: cartMapItem }))
    }
    else {
      this.store.dispatch(removeCartItem({ id }));
    }
  }
  getTotal(): number {
    if (this.cartList.length) {
      this.total = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        this.total += this.cartList[i].price * this.cartMap[i].quantity;
      }
      return this.total;
    }
    else
      return 0;
  }
  checkOut() {
    this.store.dispatch(saveCart());
    // let addedUser: User
    // this.subscriptions.add(this.store.select(selectUser).subscribe(user => {
    //   addedUser = user;
    // }));
    // if (addedUser) {
    //   if (this.cartMap.length) {
    //     let order: Order = { addedCart: this.cartMap };
    //     this.store.dispatch(clearCart());
    //     this.mainService.fetchCartOrder().subscribe(res => {

    //       this.orderList = res || [];
    //       this.orderList.push(order);
    //       this.mainService.saveCartOrder(this.orderList).subscribe(res => {
    //         this.router.navigate(['/history']);
    //       });
    //     })
    //   }
    //   else {
    //     alert('add pizzas to cart')
    //   }
    // }
    // else {
    //   this.dialog.open(UserDetailsComponent, {
    //     width: '600px'
    //   });
    // }
  }
  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }

}
