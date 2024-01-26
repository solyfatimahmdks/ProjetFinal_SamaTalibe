import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFormVisible = true; // Indique si le formulaire de connexion est visible
signupForm: TemplateRef<NgIfContext<boolean>> | null | undefined;

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}
