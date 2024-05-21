import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/store/app.reducer";
import { Cart } from "../cart/cart.model";
import { MainService } from "../main-container.service";
import * as PizzaActions from "./pizza.action";
import { selectCart } from "./pizza.selector";

@Injectable()
export class PizzaStoreEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mainService: MainService
    ) { }
    loadPizzaList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.fetchPizzaList),
            switchMap(() => {
                return this.mainService.getPizzaList().pipe(
                    map((response) => {
                        return PizzaActions.setPizzaList({ pizzaList: response.pizzaList })
                    })
                )
            })
        ));
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.addUser),
            switchMap(({ user }) => {
                return this.mainService.addUser(user).pipe(
                    map((addedUser) => {

                        return PizzaActions.setUser({ user: addedUser })
                    })
                )
            })
        ));

        loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.loginUser),
            switchMap(({ user }) => {
                return this.mainService.loginUser(user).pipe(
                    map((loggedInUser : any) => {
                        console.log(loggedInUser);
                        localStorage.setItem("userId" , loggedInUser.id);

                        // return PizzaActions.setUser({ user: addedUser })
                    })
                )
            })
        ),{dispatch : false});
        

    fetchUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.fetchUser),
            switchMap(() => {
                return this.mainService.fetchUser().pipe(
                    map((user) => {
                        return PizzaActions.setUser({ user: user })
                    })
                )
            })
        ));
    saveCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.saveCart),
            withLatestFrom(this.store.select(selectCart)),
            switchMap(([action, cart]) => {
                return this.mainService.saveCart(cart).pipe(
                    map((cart) => {
                        console.log(cart)
                    })
                )
            })
        ), { dispatch: false });
    updateCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.updateCart),
            withLatestFrom(this.store.select(selectCart)),
            switchMap(([action, cart]) => {
                let selectedPizza: Cart = { name: action.name, quantity: 1 }
                let cartList: Cart[] = [...cart];
                
                if (cartList.find((item) => item.name == action.name)) {
                    let id = cartList.findIndex(item => item.name == action.name);
                    selectedPizza.quantity = cartList[id].quantity + 1
                    cartList[id] = selectedPizza;

                    this.store.dispatch(PizzaActions.updateCartSuccess({ cartList: cartList }));
                    // this.store.dispatch(PizzaActions.saveCart());

                } else {

                    this.store.dispatch(PizzaActions.addToCart({ cartItem: selectedPizza }));
                    // this.store.dispatch(PizzaActions.saveCart());
                }
                return EMPTY
            })
        ), { dispatch: false });
    decreaseCount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.decreaseCount),
            withLatestFrom(this.store.select(selectCart)),
            switchMap(([action , cart]) => {
                let cartList : Cart[] = [...cart];
                cartList[action.id] = action.item;
                this.store.dispatch(PizzaActions.updateCartSuccess({cartList : cartList}));
                // this.store.dispatch(PizzaActions.saveCart());
                return EMPTY;
            })

        ),{dispatch : false});
        
    removeCartItem =  createEffect(() => 
        this.actions$.pipe(
            ofType(PizzaActions.removeCartItem),
            withLatestFrom(this.store.select(selectCart)),
            switchMap(([action , cart]) => {
                let cartList : Cart[] = [...cart];
                cartList.splice(action.id , 1);
                this.store.dispatch(PizzaActions.updateCartSuccess({cartList : cartList}));
                // this.store.dispatch(PizzaActions.saveCart());
                return EMPTY;
            })
        ),{dispatch : false});
    signOutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.signOutUser),
            switchMap(() => {
                return this.mainService.signOutUser().pipe(
                    map((state) => PizzaActions.signOutUser()))
            })
        ));
    fetchCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.fetchCart),
            switchMap(() => {
                return this.mainService.fetchCart().pipe(
                    map(cart => {
                        let fetchedCart = cart || [];
                        return PizzaActions.setCartMap({ cartMap: fetchedCart })
                    }))
            })
        ));
    clearCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.clearCart),
            switchMap(() => {
                return this.mainService.clearCart().pipe(
                    map(res =>
                        PizzaActions.clearCartSuccess())
                )
            })
        ))
}