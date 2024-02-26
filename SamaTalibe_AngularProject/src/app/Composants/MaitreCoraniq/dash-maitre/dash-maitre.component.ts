import { Component, OnInit } from '@angular/core';
import { AllservicesService } from '../../../service/all-services-rest.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-dash-maitre',
  templateUrl: './dash-maitre.component.html',
  styleUrls: ['./dash-maitre.component.css']
})
export class DashMaitreComponent implements OnInit {

  dahraList: any[] = [];
  dahras: any;
  // dahras: any[] = []; 
  pagedDahras: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 3; 

  // Déclarez des propriétés pour stocker les valeurs des champs
  nomDahra: string = '';
  nomOustaz: string = '';
  numeroTelephone: string = '';
  numeroTelephoneOustaz: string= '';
  adresse: string = '';
  region: string = '';
  email: string = '';
  password: string = '';
  nombreTalibe: string = '';
  uploadedImages: any;



  constructor(private allservicesService: AllservicesService) { }
  ngOnInit(): void {
    this.loadDahraList();
  }
   
  onSubmit() {
    // Créez un objet avec les données du formulaire
    const dataToSend = {
      nomDahra: this.nomDahra,
      nomOustaz: this.nomOustaz,
      numeroTelephone: this.numeroTelephone,
      numeroTelephoneOustaz: this.numeroTelephoneOustaz,
      adresse: this.adresse,
      region: this.region,
      email: this.email,
      password: this.password,
      nombreTalibe: this.nombreTalibe,
      

    };
    
    this.allservicesService.post('/register/dahra', dataToSend, (response: any) => {
       this.allservicesService = response; 
      this.allservicesService.message('Succès', 'success', 'Le Dahra a été ajouté avec succès.');
    });

}


getImageUrl(event: any) {
  console.warn(event.target.files[0]);
  this.uploadedImages = event.target.files[0] as File;
}

getImage(path: string): string {
  // console.log( 'jjlkl' , path);  
    if (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png")) {
        return `${environment.apiUrl}${path}` ;
    } else {
        return "https://placehold.co/20x20";
    }
}
loadDahraList() {
    this.allservicesService.get('/lister-dahra', (reponse: any) => {
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

}
