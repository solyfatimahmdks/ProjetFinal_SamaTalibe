import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false; // Ajoutez cette variable
  isDahrasDropdownVisible: boolean = false;
  isSoutiensDropdownVisible: boolean = false;

  constructor(private router: Router) {}

  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  isHeaderFixed: boolean | undefined;

  // onScroll(event: any) {
  //   // Ajoutez votre logique pour déterminer si le header doit être fixé
  //   this.isHeaderFixed = window.scrollY > 0;
    
  // }
 
  toggleDahrasDropdown() {
    this.isDahrasDropdownVisible = !this.isDahrasDropdownVisible;  
    this.isDropdownOpen = this.isDahrasDropdownVisible; // Mettez à jour la variable
  }

  toggleSoutiensDropdown() {
    this.isSoutiensDropdownVisible = !this.isSoutiensDropdownVisible;
    this.isDropdownOpen = this.isSoutiensDropdownVisible; // Mettez à jour la variable
  }
  
}
