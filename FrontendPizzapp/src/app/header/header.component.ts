import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signOutUser } from '../main-container/store/pizza.action';
import { UserDetailsComponent } from '../main-container/user-details/user-details.component';
import { AppState } from '../store/app.reducer';
import { LoginComponent } from '../main-container/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSignUp: boolean = true
  constructor(public dialog: MatDialog, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('pizzaListStore').subscribe((state) => {
      if (state.user) {
        this.showSignUp = false;
      }
    })
  }
  openSignUpDialog() {
    this.dialog.open(UserDetailsComponent, {
      width: '600px'
    })
  }

  openLoginDialog(){
    this.dialog.open(LoginComponent ,{
      width : "600px"
    })
  }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }
  onSignOut() {
    this.store.dispatch(signOutUser());
  }

}
