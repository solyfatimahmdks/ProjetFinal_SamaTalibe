import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dahras-ad-sup',
  templateUrl: './dahras-ad-sup.component.html',
  styleUrls: ['./dahras-ad-sup.component.css']
})
export class DahrasAdSupComponent implements OnInit {
  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
  }
   
  dahraActive: boolean = false; // Supposons que par défaut, le dahra est désactivé
  alreadyUnlocked: boolean = false; // Variable de contrôle pour vérifier si le dahra a déjà été débloqué
  dahrasList: any[] = [];
  selectedDahraDetails: any | null = null;
  selectedDahra: any;
  @ViewChild('modalElement') modalElement!: ElementRef;
    uploadedImages: any;
  constructor(private allservicesService: AllservicesService , private router: Router) {}

  ngOnInit(): void {
    this.loadDahrasList();
  }

  
  public dara={
    nom:'',
    nomOuztas:'',
    adresse:'',
    region:'',
    numeroTelephone:'',
    numeroTelephoneOuztas:'',
    nombreTalibe:0,
    email:'',
    password:'',
    

  }

  loadDahrasList() {
    this.allservicesService.get('/lister-dahra', (response: any) => {
      console.log(`test`,response);
      
      this.dahrasList = response.map((dahra: any) => {
        // Initialisez isBlocked à partir du stockage local
        // dahra.isBlocked = localStorage.getItem(`blocked_${dahra.id}`) || true;
        console.log(this.dahrasList)
        return dahra;
      });
    });
  }

  getImage(path: string): string {
    return path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") ? path : "https://placehold.co/100x100";
  }
  // onFileSelected(event: any) {
  //   const selectedFile = event.target.files[0] as File;
  //   this.uploadedImages.push(selectedFile);
  // }
  addDahra() {
    // Créer un nouvel objet FormData
    const formData = new FormData();
  
    // Ajouter les données du formulaire
    formData.append('imageFile', this.uploadedImages);
    formData.append('nom', this.dara.nom);
    formData.append('nomOuztas', this.dara.nomOuztas);
    formData.append('numeroTelephone', this.dara.numeroTelephone);
    formData.append('numeroTelephoneOuztas', this.dara.numeroTelephoneOuztas);
    formData.append('adresse', this.dara.adresse);
    formData.append('region', this.dara.region);
    formData.append('email', this.dara.email);
    formData.append('password', this.dara.password);
    formData.append('nombreTalibe', this.dara.nombreTalibe.toString());
  
    // Ajouter les images sélectionnées
    // if (this.uploadedImages.length > 0) {
    //   for (let i = 0; i < this.uploadedImages.length; i++) {
    //     formData.append('images[]', this.uploadedImages[i]);
    //   }
    // }

  console.log(`hfghj`,formData);
  

    // Envoyer les données à votre service
    this.allservicesService.post('/ajouter-dahra', formData, (response: any) => {
      console.log("reponse = ",response);
      // Vous pouvez gérer la réponse ici, par exemple, afficher un message de succès
      this.allservicesService.message('Succès', 'success', 'Dahra ajouté avec succès');
  
      this.loadDahrasList();
  
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




  showDahraDetailsModal(dahra: any) {
    this.selectedDahra = dahra;

    // Ouvrir le modal en utilisant JavaScript de Bootstrap
    const modalElement = document.getElementById('dahraDetailsModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Afficher le modal
      modalElement.style.display = 'block'; // Afficher le modal
    }
  }

  closeDahraDetailsModal() {
    this.selectedDahraDetails = null;

    // Fermer le modal en utilisant JavaScript de Bootstrap
    const modalElement = document.getElementById('dahraDetailsModal');
    if (modalElement) {
      modalElement.classList.remove('show'); // Cacher le modal
      modalElement.style.display = 'none'; // Cacher le modal
    }
  }

 

  activateDahra(id: number) {
    // const url = `http://127.0.0.1:8000/api/admin/activate/dahra/${id}`;

    this.allservicesService.post(`/admin/activate/dahra/${id}`, {},
      (response: any) => {
        console.log('Dahra activé avec succès :', response);
        this.activateDahra = response;
        this.dahraActive = true;
        this.alreadyUnlocked = true;
      },
      
    );
  }



  delete(id: number) {
    this.allservicesService.simplePost('/supprimer-dahra/'+id,  (response: any) => {
      this.delete = response;
      this.allservicesService.message('Succès', 'success', 'Dahra supprimé avec succès');
  
      // Rechargez la liste après la suppression
      this.loadDahrasList();
    });
  }

  
}
