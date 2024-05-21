import { Action, createAction, props } from "@ngrx/store";
import { type } from "os";

import { Cart } from "../cart/cart.model";
import { Pizza } from "../pizza-list/pizza.model";
import { User } from "../user-details/user.model";
import { Login } from "../login/login.model";

export const setPizzaList = createAction('[Pizza-List] set pizza list in state', props<{pizzaList : Pizza[]}>());
export const fetchPizzaList = createAction('[Pizza-List] fetch pizza list from database');

export const updateCart = createAction('[cart] change count of items in cart' , props<{name : string}>());
export const decreaseCount  = createAction('[cart] decrease the count of quantity of item' , props<{id : number , item : Cart}>());

export const removeCartItem = createAction('[cart] remove item when count is 0', props<{id :  number}>());
export const addUser = createAction('[user-details] add user on signup', props<{user : User}>());
export const loginUser = createAction('[user-login] login user effect' , props<{user : Login}>());
export const setUser =  createAction('[user-details] set user in state', props<{user : User}>() );
export const fetchUser =  createAction('[userDetails] fetch user from database');
export const saveCart = createAction('[cart] save cart in database');
export const updateCartSuccess = createAction('[cart] Update Cart State', props<{cartList : Cart[]}>());
export const addToCart = createAction('[cart] Add To item in cart state ' , props<{cartItem : Cart}>());
export const signOutUser = createAction('[signOut] user signout'); 
export const signOutUserSuccess = createAction('[user] remove user from state' );
export const clearCart =createAction('[cart] clear cart on checkout');
export const clearCartSuccess = createAction('[cart] clear cart from state')
export const fetchCart = createAction('[cart] fetch cart from database');
export const setCartMap = createAction('[cart] set cartmap in state', props<{cartMap : Cart[]}>());
