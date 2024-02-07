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
  dahrasList: any[] = [];
  selectedDahraDetails: any | null = null;
  selectedDahra: any;
  @ViewChild('modalElement') modalElement!: ElementRef;
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
      this.dahrasList = response.map((dahra: any) => {
        // Initialisez isBlocked à partir du stockage local
        // dahra.isBlocked = localStorage.getItem(`blocked_${dahra.id}`) || true;
        console.log(this.dahrasList)
        return dahra;
      });
    });
  }


  addDahra() {
   
    console.log("data = ",this.dara);
    this.allservicesService.post('/ajouter-dahra',  this.dara, (response: any) => {
      // this.addDahra = response ;
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

  unlockDahra(id: number) {
    this.allservicesService.post(`/admin/activate/dahra/${id}`, {}, (response: any) => {
      // Gérer la réponse ici
      console.log(response);
      // Afficher un message de succès
      this.allservicesService.message('Succès', 'success', 'Dahra débloqué avec succès');
      
      // Mettre à jour isBlocked à false pour le dahra débloqué
      const index = this.dahrasList.findIndex((dahra: any) => dahra.id === id);
      if (index !== -1) {
        this.dahrasList[index].isBlocked = false;
      }

      // Mettre à jour isBlocked à true pour les autres dahras
      this.dahrasList.forEach((dahra: any, i: number) => {
        if (i !== index) {
          dahra.isBlocked = true;
        }
      });
    });
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
