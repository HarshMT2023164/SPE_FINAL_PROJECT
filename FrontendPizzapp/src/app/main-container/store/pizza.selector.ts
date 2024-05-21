import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";


export const selectFeature = (state : AppState) => state.pizzaListStore
export const selectPizzaList = createSelector(selectFeature , state => state.pizzaList);
export const selectCart = createSelector(selectFeature , state => state.cartMap);
export const selectUser = createSelector(selectFeature , state => state.user);