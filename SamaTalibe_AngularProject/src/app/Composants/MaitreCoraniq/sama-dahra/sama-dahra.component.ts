
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-sama-dahra',
  templateUrl: './sama-dahra.component.html',
  styleUrls: ['./sama-dahra.component.css']
})
// N'oubliez pas d'ajouter 'export' devant la classe
export class SamaDahraComponent  implements OnInit{
showTalibeEdit: boolean = false;
public currentId:any="";
  talibes: any;
cancelEdit() {
throw new Error('Method not implemented.');
}
  showListTalib = true;
  showListTalibArchiv = false;
  @ViewChild('modalElement') modalElement!: ElementRef;
  router: any;
  talibe: any = {};
  uploadedImages: any;
  talibesList: any[] = [];
  talibeSelectionne: any;
  pagedTalibes: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 4; 

  toggleView(view: string): void {
    this.showListTalib = view === 'listTalib';
    this.showListTalibArchiv = view === 'listTalibArchiv';
  }
  constructor(private service: AllservicesService , private route : Router) {}
  ngOnInit(): void {
    this.loadTalibesList();
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
    console.log("D:",this.talibes.length);

    // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
    // const startIndex = (page - 1) * this.itemsPerPage;
    // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);
    
    // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);

    // Mettre à jour la page actuelle
    this.currentPage = page ;
    this.pagedTalibes =  this.paginatePerPage(this.currentPage,this.itemsPerPage,this.talibes)
    console.log("D:",this.talibes.length);
    console.log("d:",this.pagedTalibes.length);
 
  }

  
  loadTalibesList() {
    this.service.getWithToken('/lister-mes-talibes', (response: any) => {
      console.log(`test`,response);
      
      this.talibesList = response.map((talibe: any) => {
        // Initialisez isBlocked à partir du stockage local
        // talibe.isBlocked = localStorage.getItem(`blocked_${talibe.id}`) || true;
        console.log(this.talibesList)
        return talibe;
      });
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


  addTalibe() {
    // Créer un nouvel objet FormData
    const formData = new FormData();
  
    // Ajouter les données du formulaire
    formData.append('imageFile', this.uploadedImages);
    formData.append('nom', this.talibe.nom);
    formData.append('prenom', this.talibe.prenom);
    formData.append('age', this.talibe.age);
    formData.append('adresse', this.talibe.adresse);
    formData.append('situation', this.talibe.situation);
    formData.append('description', this.talibe.description);
    formData.append('datearrivetalibe', this.talibe.datearrivetalibe);

    console.log('imageFile:', this.uploadedImages);
    console.log('nom:', this.talibe.nom);
    console.log('prenom:', this.talibe.prenom);
    console.log('age:', this.talibe.age);
    console.log('adresse:', this.talibe.adresse);
    console.log('situation:', this.talibe.situation);
    console.log('description:', this.talibe.description);
    console.log('datearrivetalibe:', this.talibe.datearrivetalibe);

    // Envoyer les données à votre service
    this.service.post('/inscrire/add-talibe', formData, (response: any) => {
      console.log("testing",response);
      // Vous pouvez gérer la réponse ici, par exemple, afficher un message de succès
      this.service.message('Succès', 'success', 'Dahra ajouté avec succès');
  
      this.loadTalibesList();
  
      // Naviguer vers la même page pour rafraîchir l'affichage (peut être facultatif)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/samadahra']);
      });

      this.hideModal();
    });
  }
  private hideModal(): void {
    const modal: any = this.modalElement.nativeElement;
    modal.hide();
  }

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.service.message('Au revoir','success','deconnexion faite avec succès');
  }

  showTalibeDetailsModal(talibe: any) {
    this.talibeSelectionne = talibe;
}

showTalibeEditModal(talibe: any) {
  // this.selectedDahra = { ...dahra };
  this.showTalibeEdit= true;
  this.talibe.nom=talibe.nom;
  this.talibe.prenom=talibe.prenom;
  this.talibe.age=talibe.age;
  this.talibe.adresse=talibe.adresse;
  this.talibe.situation=talibe.situation;
  this.talibe.description=talibe.description;
  this.talibe.datearrivetalibe=talibe.datearrivetalibe;
  this.currentId=talibe.id;

  console.log(talibe);
} 


modifierTalibe() {
  // Appelez la méthode put de votre service allservicesrest
  this.service.put('/modifier_info_talibe/'+ this.currentId, this.talibe , (response: any) => {
      // Gérer la réponse du serveur (message de succès ou d'erreur)
      console.log(response);
      // this.hideEditModal();
    },
    
)}


supprimerTalibe(talibe: any) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce talibé ?')) {
    this.service. delete('/dahra/supprimer-talibe/' + talibe.id ,(response: any) => {
        console.log(response);  
        this.supprimerTalibe = response;  
        this.service.message('Succès', 'success', 'Dahra supprimé avec succès');

        this.loadTalibesList;
      },

    );
  }
}

}
