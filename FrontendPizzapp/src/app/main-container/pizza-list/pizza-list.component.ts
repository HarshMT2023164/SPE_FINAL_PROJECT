import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { MainService } from '../main-container.service';
import { updateCart } from '../store/pizza.action';
// import { addPizzaToCart } from '../store/pizza.action';
import { State } from '../store/pizza.reducer';
import { selectPizzaList } from '../store/pizza.selector';
import { Pizza } from './pizza.model';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  clicked: Boolean = false;
  index: number = -1;
  searchControl = new FormControl();
  pizzaList: Pizza[] = [];
  selectedPizzaList: Pizza[] = [];
  sortValues = ['price', 'popularity'];
  sortBy: string;
  filteredList: Pizza[]
  constructor(private mainService: MainService,
    private store: Store<AppState>,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.store.select(selectPizzaList).subscribe(pizzaList => {

      this.pizzaList = JSON.parse(JSON.stringify(pizzaList));
      this.filteredList = this.pizzaList;
    })
  }

  addToCart(id: number) {
    // this.pizzaList = [{ name: 'pizza1', price: 340, popularity: 3, url: "https://images.dominos.co.in/Paneer-Spice-Supreme-Customize.jpg" }, { name: 'pizza2', price: 550, popularity: 4, url: "https://images.dominos.co.in/Veggie-Buddies-Customize.jpg" }, { name: 'pizza3', price: 340, popularity: 4, url: "https://images.dominos.co.in/PIZ0171.jpg" }, { name: 'pizza4', price: 340, popularity: 5, url: "https://images.dominos.co.in/Triple-Veg-Delight-Customise.jpg" }]
    this.store.dispatch(updateCart({ name: this.pizzaList[id].name }));


  }
  // isClickable(id : number):boolean{
  //   return this.selectedPizzaList.includes(this.pizzaList[id]);
  //  }
  onSearch() {
    let name = this.searchControl.value;
    this.pizzaList = this.filteredList.filter((pizza) => pizza.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
  }
  onSort() {
    let sortProperty = this.sortBy
    this.pizzaList.sort((p1, p2) =>
      (p1[sortProperty] > p2[sortProperty]) ? 1 : (p1[sortProperty] < p2[sortProperty]) ? -1 : 0)

  }
}
