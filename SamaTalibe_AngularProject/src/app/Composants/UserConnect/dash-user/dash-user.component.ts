import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css'],
})
export class DashUserComponent {
  selectedDahra: any;
  searchQuery: string = '';
  parrainages: any;
  talibeSelected?: number;

  dahras: any[] = [];
  pagedDahras: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 3;
  talibesList: any[] = [];
  showListDahra: boolean = true;
  showListTalib: boolean = false;
  isCheckboxChecked: boolean = false;
  router: any;
  uploadedImages: any;
  talibe: any;

  constructor(private service: AllservicesService , private route: Router) {}

  ngOnInit() {
    this.loaddahras();
  }

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.service.message('Au revoir','success','deconnexion faite avec succès');
  }

  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
  }

  getImage(path: string): string {
    // console.log( 'jjlkl' , path);
    if (
      path?.includes('.jpeg') ||
      path?.includes('.jpg') ||
      path?.includes('.png')
    ) {
      return `${environment.apiUrl}${path}`;
    } else {
      return 'https://placehold.co/20x20';
    }
  }

  searchDahras(): void {
    console.log(this.searchQuery.trim() !== '');

    if (this.searchQuery.trim() !== '') {
      const params = new HttpParams().append('nom', this.searchQuery);
      this.service.get(
        '/recherche-dahra',
        (response: any) => {
          this.dahras = response;
          console.log(response);
        },
        params
      );
    } else {
      // Si la recherche est vide, chargez tous les dahras
      this.loaddahras();
    }
  }

  loaddahras() {
    this.service.get('/lister-dahra', (reponse: any) => {
      console.log('test', reponse);
      this.dahras = reponse;
    });
  }

  loadTalibes(dahraSelected: string) {
    this.service.getWithToken(`/lister-talibe`, (reponse: any[]) => {
      console.log('Liste des apprenants du dahra', reponse);

      this.talibesList = reponse.filter(
        (dahra) => dahra.dahraNom == dahraSelected
      );
      console.log('Liste des apprenants du dahra', this.talibesList);
    });
  }

  selectDahra(dahra: any) {
    this.selectedDahra = dahra;
  }

  toggleList(section: string, dahraSelected?: string) {
    console.log(dahraSelected);

    if (section === 'dahra') {
      this.showListDahra = true;
      this.showListTalib = false;
    } else if (section === 'talib') {
      this.showListDahra = false;
      this.showListTalib = true;
      this.loadTalibes(dahraSelected!);
    }
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
    console.log('D:', this.dahras.length);

    // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
    // const startIndex = (page - 1) * this.itemsPerPage;
    // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);

    // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);

    // Mettre à jour la page actuelle
    this.currentPage = page;
    this.pagedDahras = this.paginatePerPage(
      this.currentPage,
      this.itemsPerPage,
      this.dahras
    );
    console.log('D:', this.dahras.length);
    console.log('d:', this.pagedDahras.length);
  }

  makeParrainage(talibeId: number) {
    // Affiche une alerte demandant à l'utilisateur de patienter
    // Swal.fire({
    //   title: 'Patientez...',
    //   text: 'Votre parrainage est en cours de validation.',
    //   icon: 'info',
    //   showCancelButton: false,
    //   showConfirmButton: true,
    //   allowOutsideClick: true,
    // });

    this.service.postWithError(
      '/creer-parrainage',
      { talibe_id: talibeId },
      (reponse: any) => {
        console.log(reponse);
        this.parrainages = reponse;
        console.log(this.parrainages);

        Swal.fire({
          title: 'Parrainage pris en compte!',
          text: 'Vous serez notifié une fois que le parrainage sera confirmé.',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
      },((error:any)=>{
        console.log(error)
        if (error.status==400) {
          this.service.message("Occupé",'warning',"Ce talibé a déja été parrainé");
        }
      })
    );
  }
  getTalibeId(talibeId: number) {
    this.talibeSelected = talibeId;
  }
}
