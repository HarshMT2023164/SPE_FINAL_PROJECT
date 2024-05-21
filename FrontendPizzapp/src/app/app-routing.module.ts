import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userInfo } from 'os';
import { UserDetailsComponent } from './main-container/user-details/user-details.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { HistoryComponent } from './main-container/history/history.component';

const routes: Routes = [
  {path: '' , component : MainContainerComponent},
  {path: 'history' , component : HistoryComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
