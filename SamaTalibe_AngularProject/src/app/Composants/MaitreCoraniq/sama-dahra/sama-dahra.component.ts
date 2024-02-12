
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';


@Component({
  selector: 'app-sama-dahra',
  templateUrl: './sama-dahra.component.html',
  styleUrls: ['./sama-dahra.component.css']
})
// N'oubliez pas d'ajouter 'export' devant la classe
export class SamaDahraComponent {
  showListTalib = true;
  showListTalibArchiv = false;
  @ViewChild('modalElement') modalElement!: ElementRef;
  router: any;
  talibe: any;
  uploadedImages: any;


  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
  }


  toggleView(view: string): void {
    this.showListTalib = view === 'listTalib';
    this.showListTalibArchiv = view === 'listTalibArchiv';
  }
  constructor(private service: AllservicesService) {}

  addTalibe() {
    // Créer un nouvel objet FormData
    const formData = new FormData();
  
    // Ajouter les données du formulaire
    formData.append('imageFilename', this.uploadedImages);
    formData.append('nom', this.talibe.nom);
    formData.append('prenom', this.talibe.prenom);
    formData.append('age', this.talibe.age);
    formData.append('adresse', this.talibe.adresse);
    formData.append('situation', this.talibe.situation);
    formData.append('description', this.talibe.description);
    formData.append('datearrivetalibe', this.talibe.datearrivetalibe);
    formData.append('presencetalibe', this.talibe.presencetalibe);
  
    // Ajouter les images sélectionnées
    // if (this.uploadedImages.length > 0) {
    //   for (let i = 0; i < this.uploadedImages.length; i++) {
    //     formData.append('images[]', this.uploadedImages[i]);
    //   }
    // }

  console.log(`hfghj`,formData);
  

    // Envoyer les données à votre service
    this.service.post('/ajouter-dahra', formData, (response: any) => {
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
