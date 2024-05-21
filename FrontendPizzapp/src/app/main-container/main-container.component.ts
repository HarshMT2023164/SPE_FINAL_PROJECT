import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { fetchPizzaList, fetchUser } from './store/pizza.action';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(fetchPizzaList());
    // this.store.dispatch(fetchUser());
  }

}
