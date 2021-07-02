import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";

//Component
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import {GuardService} from "./services/guard.service";
import {EditComponent} from "./edit/edit.component";
import {AddUserComponent} from "./add-user/add-user.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [GuardService]
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [GuardService]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [GuardService]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
