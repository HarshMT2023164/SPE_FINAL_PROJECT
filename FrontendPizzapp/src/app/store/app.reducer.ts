import { ActionReducerMap } from "@ngrx/store";
import * as fromPizzaStore  from "../main-container/store/pizza.reducer";

export interface AppState{
    pizzaListStore : fromPizzaStore.State
}
export const appReducer : ActionReducerMap<AppState> = {
    pizzaListStore : fromPizzaStore.pizzaReducer
}