import { state } from "@angular/animations";
import { createReducer, on , Action } from "@ngrx/store";

import { Cart } from "../cart/cart.model";

import { Pizza } from "../pizza-list/pizza.model";
import * as PizzaActions from "../store/pizza.action";
import { User } from "../user-details/user.model";

export interface State{
    pizzaList : Pizza[],
    cartMap : Cart[],
    user : User
}

const initialState : State = {
    pizzaList : [],
    cartMap : [],
    user : null

}
const reducer = createReducer(
    initialState,

    on(PizzaActions.setPizzaList , (state , {pizzaList} ) => ({...state , pizzaList : [...pizzaList]})),
    on(PizzaActions.setCartMap, (state, {cartMap}) => ({...state , cartMap : cartMap})),
    on(PizzaActions.updateCartSuccess , (state , {cartList}) => ({...state , cartMap :  [...cartList]})),
    on(PizzaActions.addToCart , (state ,{cartItem}) => ({...state , cartMap : [...state.cartMap , cartItem]})),
    on(PizzaActions.setUser , (state , {user}) => ({...state , user : user})),
    on(PizzaActions.signOutUserSuccess ,(state) => ({...state , user : null})),
    on(PizzaActions.clearCartSuccess, (state) =>({...state , cartMap : null}) )
    
);
export function pizzaReducer(state : State | undefined , action : Action){
    return reducer(state , action)
}

