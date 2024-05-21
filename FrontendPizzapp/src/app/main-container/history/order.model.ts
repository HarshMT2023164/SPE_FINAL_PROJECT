import { Cart } from "../cart/cart.model";

export interface OrderCart{
    id : number,
    name: string,
    quantity : number
}

export interface Order{
    // addedCart : Cart[];
    id : number,
    cartList : OrderCart[]
}