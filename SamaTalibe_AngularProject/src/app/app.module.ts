import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilAdSupComponent } from './Composants/AdminSup/accueil-ad-sup/accueil-ad-sup.component';
import { DonAdSupComponent } from './Composants/AdminSup/don-ad-sup/don-ad-sup.component';
import { ParrainAdSupComponent } from './Composants/AdminSup/parrain-ad-sup/parrain-ad-sup.component';
import { RolesAdSupComponent } from './Composants/AdminSup/roles-ad-sup/roles-ad-sup.component';
import { DahrasAdSupComponent } from './Composants/AdminSup/dahras-ad-sup/dahras-ad-sup.component';
import { LoginComponent } from './Composants/Auth/login/login.component';
import { HeaderComponent } from './Composants/HeaderFooter/header/header.component';
import { FooterComponent } from './Composants/HeaderFooter/footer/footer.component';
import { DashMaitreComponent } from './Composants/MaitreCoraniq/dash-maitre/dash-maitre.component';
import { ParrainMaitreCoraniqComponent } from './Composants/MaitreCoraniq/parrain-maitre-coraniq/parrain-maitre-coraniq.component';
import { DonsMaitreComponent } from './Composants/MaitreCoraniq/dons-maitre/dons-maitre.component';
import { DashUserComponent } from './Composants/UserConnect/dash-user/dash-user.component';
import { DonsUserComponent } from './Composants/UserConnect/dons-user/dons-user.component';
import { ParrainUserComponent } from './Composants/UserConnect/parrain-user/parrain-user.component';
import { TemUserComponent } from './Composants/UserConnect/tem-user/tem-user.component';
import { AccueilComponent } from './Composants/UserNonConnect/accueil/accueil.component';
import { AproposComponent } from './Composants/UserNonConnect/apropos/apropos.component';
import { DahraComponent } from './Composants/UserNonConnect/dahra/dahra.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AccueilAdSupComponent,
    DonAdSupComponent,
    ParrainAdSupComponent,
    RolesAdSupComponent,
    DahrasAdSupComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashMaitreComponent,
    ParrainMaitreCoraniqComponent,
    DonsMaitreComponent,
    DashUserComponent,
    DonsUserComponent,
    ParrainUserComponent,
    TemUserComponent,
    AccueilComponent,
    AproposComponent,
    DahraComponent,
  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
