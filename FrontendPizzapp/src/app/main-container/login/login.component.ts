import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Login } from './login.model';
import { MainService } from '../main-container.service';
import * as PizzaActions from '../store/pizza.action';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  loginForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      
    })
  }
  onSubmit() {
    const user: Login = {
     
      userName: this.loginForm.value['email'],
      password : this.loginForm.value['password']
    }
    console.log(user);
    this.store.dispatch(PizzaActions.loginUser({ user: user }))
    this.dialogRef.close();

  }

}


