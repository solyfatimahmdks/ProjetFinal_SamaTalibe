
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';


@Component({
  selector: 'app-sama-dahra',
  templateUrl: './sama-dahra.component.html',
  styleUrls: ['./sama-dahra.component.css']
})
// N'oubliez pas d'ajouter 'export' devant la classe
export class SamaDahraComponent  implements OnInit{
  showListTalib = true;
  showListTalibArchiv = false;
  @ViewChild('modalElement') modalElement!: ElementRef;
  router: any;
  talibe: any = {};
  uploadedImages: any;
  talibesList: any[] = [];


  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
  }


  toggleView(view: string): void {
    this.showListTalib = view === 'listTalib';
    this.showListTalibArchiv = view === 'listTalibArchiv';
  }
  constructor(private service: AllservicesService) {}
  ngOnInit(): void {
    this.loadTalibesList();
  }

  loadTalibesList() {
    this.service.get('/lister-talibe', (response: any) => {
      console.log(`test`,response);
      
      this.talibesList = response.map((talibe: any) => {
        // Initialisez isBlocked à partir du stockage local
        // talibe.isBlocked = localStorage.getItem(`blocked_${talibe.id}`) || true;
        console.log(this.talibesList)
        return talibe;
      });
    });
  }

  getImage(path: string): string {
    return path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") ? path : "https://placehold.co/20x20";
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
    formData.append('dateArriveTalibe', this.talibe.datearrivetalibe);
    formData.append('presenceTalibe', this.talibe.presencetalibe);

    // console.log('imageFile:', this.uploadedImages);
    // console.log('nom:', this.talibe.nom);
    // console.log('prenom:', this.talibe.prenom);
    // console.log('age:', this.talibe.age);
    // console.log('adresse:', this.talibe.adresse);
    // console.log('situation:', this.talibe.situation);
    // console.log('description:', this.talibe.description);
    // console.log('datearrivetalibe:', this.talibe.datearrivetalibe);
    // console.log('presencetalibe:', this.talibe.presencetalibe);

    // Envoyer les données à votre service
    this.service.post('/inscrire/add-talibe', formData, (response: any) => {
      console.log("reponse = ",response);
      // Vous pouvez gérer la réponse ici, par exemple, afficher un message de succès
      this.service.message('Succès', 'success', 'Dahra ajouté avec succès');
  
      // this.loadTalibeList();
  
      // Naviguer vers la même page pour rafraîchir l'affichage (peut être facultatif)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dahras-ad-sup']);
      });
      this.hideModal();
    });
  }
  private hideModal(): void {
    const modal: any = this.modalElement.nativeElement;
    modal.hide();
  }
}
