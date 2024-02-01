
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../app/Composants/UserNonConnect/accueil/accueil.component';
import { AproposComponent } from '../app/Composants/UserNonConnect/apropos/apropos.component';
import { LoginComponent } from './Composants/Auth/login/login.component';
import { DahraComponent } from './Composants/UserNonConnect/dahra/dahra.component';
import { SoutiensComponent } from './Composants/UserNonConnect/soutiens/soutiens.component';
import { AccueilAdSupComponent } from './Composants/AdminSup/accueil-ad-sup/accueil-ad-sup.component';
import { DahrasAdSupComponent } from './Composants/AdminSup/dahras-ad-sup/dahras-ad-sup.component';
import { DonAdSupComponent } from './Composants/AdminSup/don-ad-sup/don-ad-sup.component';
import { ParrainAdSupComponent } from './Composants/AdminSup/parrain-ad-sup/parrain-ad-sup.component';
import { RolesAdSupComponent } from './Composants/AdminSup/roles-ad-sup/roles-ad-sup.component';
import { DashMaitreComponent } from './Composants/MaitreCoraniq/dash-maitre/dash-maitre.component';
import { DonsMaitreComponent } from './Composants/MaitreCoraniq/dons-maitre/dons-maitre.component';
import { ParrainMaitreCoraniqComponent } from './Composants/MaitreCoraniq/parrain-maitre-coraniq/parrain-maitre-coraniq.component';
import { DashUserComponent } from './Composants/UserConnect/dash-user/dash-user.component';
import { DonsUserComponent } from './Composants/UserConnect/dons-user/dons-user.component';
import { ParrainUserComponent } from './Composants/UserConnect/parrain-user/parrain-user.component';
import { TemUserComponent } from './Composants/UserConnect/tem-user/tem-user.component';
import { ListDahraComponent } from './Composants/UserNonConnect/dahra/list-dahra/list-dahra.component';
import { DonUserNonConnectComponent } from './Composants/UserNonConnect/soutiens/don-user-non-connect/don-user-non-connect.component';
import { ParrainsComponent } from './Composants/UserNonConnect/soutiens/parrains/parrains.component';
import { ListTalibesComponent } from './Composants/UserNonConnect/dahra/list-talibes/list-talibes.component';
import { TemMaitreComponent } from './Composants/MaitreCoraniq/tem-maitre/tem-maitre.component';
import { SamaDahraComponent } from './Composants/MaitreCoraniq/sama-dahra/sama-dahra.component';



const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'a-propos', component: AproposComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dahras' , component: DahraComponent},
  { path: 'soutiens' , component: SoutiensComponent},
  { path: 'adsup' , component: AccueilAdSupComponent},
  { path: 'dahradsup' , component: DahrasAdSupComponent},
  { path: 'donadsup' , component: DonAdSupComponent},
  { path: 'parrainadsup' , component: ParrainAdSupComponent},
  { path: 'rolesadsup' , component: RolesAdSupComponent},
  { path: 'dashmaitre' , component: DashMaitreComponent},
  { path: 'donsmaitre' , component: DonsMaitreComponent},
  { path: 'parrainmaitre' , component: ParrainMaitreCoraniqComponent},
  { path: 'dashuser' , component: DashUserComponent},
  { path: 'donsuser' , component: DonsUserComponent},
  { path: 'parrainuser' , component: ParrainUserComponent},
  { path: 'temuser' , component: TemUserComponent},
  { path: 'listdahra' , component: ListDahraComponent},
  { path: 'donnations' , component: DonUserNonConnectComponent},
  { path: 'parrains', component: ParrainsComponent},
  { path: 'soutiens' , component: SoutiensComponent},
  { path: 'talibes' , component: ListTalibesComponent},
  { path: 'temaitre' , component: TemMaitreComponent},
  { path: 'samadahra' , component: SamaDahraComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
