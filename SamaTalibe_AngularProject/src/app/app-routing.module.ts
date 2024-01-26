
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../app/Composants/UserNonConnect/accueil/accueil.component';
import { AproposComponent } from '../app/Composants/UserNonConnect/apropos/apropos.component';
import { LoginComponent } from './Composants/Auth/login/login.component';
import { AccueilAdSupComponent } from './Composants/AdminSup/accueil-ad-sup/accueil-ad-sup.component';
import { DahraComponent } from './Composants/UserNonConnect/dahra/dahra.component';
import { SoutiensComponent } from './Composants/UserNonConnect/soutiens/soutiens.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'a-propos', component: AproposComponent },
  { path: 'login', component: LoginComponent},
  { path: 'adsupaccueil' , component: AccueilAdSupComponent},
  { path: 'dahras' , component: DahraComponent},
  { path: 'soutiens' , component: SoutiensComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
