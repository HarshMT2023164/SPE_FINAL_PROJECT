import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as PizzaActions from '../store/pizza.action';
import { AppState } from '../../store/app.reducer';
import { User } from './user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.userDetailsForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'password' : new FormControl(null , [Validators.required])
    })
  }
  onSubmit() {
    const user: User = {
      name: this.userDetailsForm.value['name'],
      address: this.userDetailsForm.value['address'],
      phone: this.userDetailsForm.value['phone'],
      email: this.userDetailsForm.value['email'],
      password : this.userDetailsForm.value['password']
    }
    console.log(user);
    this.store.dispatch(PizzaActions.addUser({ user: user }))
    this.dialogRef.close();

  }

}
