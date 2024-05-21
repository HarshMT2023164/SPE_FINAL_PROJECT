import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { FooterComponent } from './footer/footer.component';
import { PizzaListComponent } from './main-container/pizza-list/pizza-list.component';
import { CartComponent } from './main-container/cart/cart.component';
import { MainService } from './main-container/main-container.service';
import { StoreModule } from '@ngrx/store';
import { pizzaReducer } from './main-container/store/pizza.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';

import { UserDetailsComponent } from './main-container/user-details/user-details.component';
import { HttpClientModule } from '@angular/common/http';
import { PizzaStoreEffects } from './main-container/store/pizza.effects';
import { HistoryComponent } from './main-container/history/history.component';
import { LoginComponent } from './main-container/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContainerComponent,
    FooterComponent,
    PizzaListComponent,
    CartComponent,
    
    UserDetailsComponent,
         HistoryComponent,
         LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([PizzaStoreEffects]),
    FormsModule,
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
