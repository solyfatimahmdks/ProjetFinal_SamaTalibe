import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css']
})
export class DashUserComponent {
  dahras: any[] = []; 
  pagedDahras: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 3; 
  talibesList: any[] = [];
  showListDahra: boolean = true;
  showListTalib: boolean = false;
  isCheckboxChecked: boolean = false;
  router: any;

  constructor(private service: AllservicesService) {}

  ngOnInit() {
   this.loaddahras();
  }

  getImage(path: string): string {
    return path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") ? path : "https://placehold.co/20x20";
  }

  loaddahras() {
    this.service.get('/lister-dahra', (reponse: any) => {
      console.log('test', reponse);
      this.dahras=reponse;
    });
}

paginatePerPage(page: number, pageSize: number, data: any[]): any[] {
  if (!page) {
    return data;
  }
  const firsElementPerPage = pageSize * (page-1);
  const totalElements = firsElementPerPage + pageSize;
  return data.slice(firsElementPerPage, totalElements);
}

setPage(page: number) {
  console.log("page:" ,page );
  console.log("D:",this.dahras.length);

  // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
  // const startIndex = (page - 1) * this.itemsPerPage;
  // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);
  
  // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);

  // Mettre à jour la page actuelle
  this.currentPage = page ;
  this.pagedDahras =  this.paginatePerPage(this.currentPage,this.itemsPerPage,this.dahras)
  console.log("D:",this.dahras.length);
  console.log("d:",this.pagedDahras.length);

}

toggleList(section: string) {
  if (section === 'dahra') {
    this.showListDahra = true;
    this.showListTalib = false;
  } else if (section === 'talib') {
    this.showListDahra = false;
    this.showListTalib = true;
  }
}

showAlert() {
  // Affiche une alerte demandant à l'utilisateur de patienter
  Swal.fire({
      title: 'Patientez...',
      text: 'Votre parrainage est en cours de validation.',
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
  });

          // Simulez un délai de 3 secondes pour le processus de validation (vous devez ajuster cela en fonction de votre logique réelle)
          setTimeout(() => {
            // Une fois le parrainage validé, vous pouvez mettre à jour l'alerte pour informer l'utilisateur
            Swal.update({
                title: 'Parrainage validé!',
                text: 'Vous serez notifié une fois que le parrainage sera confirmé.',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                allowOutsideClick: false
            }
            );
        }, 10000); // 10000 ms = 1O secondes
    
    }

}


