import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFormVisible = true;

  loginUser = {
    username: '',
    password: ''
  };

  signupUser = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}
