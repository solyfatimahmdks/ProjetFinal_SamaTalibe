import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-list-dahra',
  templateUrl: './list-dahra.component.html',
  styleUrls: ['./list-dahra.component.css']
})
export class ListDahraComponent  implements OnInit{
search() {
throw new Error('Method not implemented.');
}
dahraList: any[] = [];
// dahras: any;
dahras: any[] = []; 
pagedDahras: any[] = []; // Les données à afficher sur une page
currentPage = 1; // Page actuelle
itemsPerPage = 3; 

  constructor(private allservicesService: AllservicesService) {}

  ngOnInit(): void {
    this.loadDahraList();
  }

loadDahraList() {
    this.allservicesService.get('/lister-dahra', (reponse: any) => {
      console.log('test', reponse);
      this.dahras=reponse;
    });
}

  getImage(path: string): string {
    return path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") ? path : "https://placehold.co/20x20";
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
