
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../app/Composants/UserNonConnect/accueil/accueil.component';
import { AproposComponent } from '../app/Composants/UserNonConnect/apropos/apropos.component';
import { LoginComponent } from './Composants/Auth/login/login.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'a-propos', component: AproposComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
