import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-dons-maitre',
  templateUrl: './dons-maitre.component.html',
  styleUrls: ['./dons-maitre.component.css']
})
export class DonsMaitreComponent {

  dons: any[] = []; 
  pagedDons: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 4;

  constructor(private service: AllservicesService ,private route: Router ) {}

  ngOnInit(): void {
    this. loadAllDons();
 }


 paginatePerPage(page: number, pageSize: number, data: any[]): any[] {
  if (!page) {
    return data;
  }
  const firsElementPerPage = pageSize * (page - 1);
  const totalElements = firsElementPerPage + pageSize;
  return data.slice(firsElementPerPage, totalElements);
}

setPage(page: number) {
  console.log('page:', page);
  console.log('D:', this.dons.length);

  // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
  // const startIndex = (page - 1) * this.itemsPerPage;
  // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);

  // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);

  // Mettre à jour la page actuelle
  this.currentPage = page;
  this.pagedDons = this.paginatePerPage(
    this.currentPage,
    this.itemsPerPage,
    this.dons
  );
  console.log('D:', this.dons.length);
  console.log('d:', this.pagedDons.length);
}
 loadAllDons() {
  this.service.getWithToken('/mes-dons', (reponse: any) => {
    console.log('test', reponse);
    console.log(this.loadAllDons);
    
    this.dons=reponse;

  });
}
deconnexion(){
  this.route.navigate(['/accueil']);
  localStorage.removeItem(TOKEN_KEY);
  this.service.message('Au revoir','success','deconnexion faite avec succès');
}
}
