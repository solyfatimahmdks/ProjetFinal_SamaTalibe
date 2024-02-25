import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-dahras-ad-sup',
  templateUrl: './dahras-ad-sup.component.html',
  styleUrls: ['./dahras-ad-sup.component.css']
})
export class DahrasAdSupComponent implements OnInit {
dahraData: any;
truthyTab: any = [];
  // Attributs
  regions: string[] = [
    'Dakar',
    'Kaolack',
    'Saint-louis',
    'Diourbel',
    'Ziguinchor',
    'Tambacounda',
    'Matam',
    'Fatick',
    'Thies',
    'Kédougou',
    'Matam',
    'Kaffrine',
    'Kolda',
    'Sédhiou',
  ];
  selectedRegion: string = '';

   
  dahraActive: boolean = false; // Supposons que par défaut, le dahra est désactivé
  alreadyUnlocked: boolean = false; // Variable de contrôle pour vérifier si le dahra a déjà été débloqué
  dahrasList: any[] = [];
  selectedDahraDetails: any| null = null;
  showDahraDetails: boolean = false;
  selectedDahra: any;
  @ViewChild('modalElement') modalElement!: ElementRef;
  uploadedImages: any;
  dahras: any[] = []; 
  pagedDahras: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 4; 


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

  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
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
      this.setPage(this.currentPage);
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


 getImage(path: string): string {
  // console.log( 'jjlkl' , path);  
    if (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png")) {
        return `${environment.apiUrl}${path}` ;
    } else {
        return "https://placehold.co/20x20";
    }
}



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
    formData.append('region', this.selectedRegion);
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
      this.router.navigateByUrl('/dahras-ad-sup', { skipLocationChange: true }).then(() => {
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
    this.showDahraDetails = true;

    // Ouvrir le modal en utilisant JavaScript de Bootstrap
    const modalElement = document.getElementById('dahraDetailsModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Afficher le modal
      modalElement.style.display = 'block'; // Afficher le modal
    }
  }

  closeDahraDetailsModal() {
    this.selectedDahraDetails = null;
    this.showDahraDetails = false ;

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


  // Voir  détails

  

  // modifierDahra(dahraData: any) {
  //   // Appelez la méthode put de votre service allservicesrest
  //   this.allservicesService.put('/modifier-dahra-admin/{id}', dahraData , (response: any) => {
  //       // Gérer la réponse du serveur (message de succès ou d'erreur)
  //       console.log(response);
  //     },
      
  // )}
  


//Validations
nomdahraValidate() {
  let validationPrenom = document.getElementById('validationNomDahra');
  const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
  if (nomPrenomRegex.test(this.dara.nom)) {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value: any) => value.dara.nom == true) == undefined) {
      this.truthyTab.push({ nom: true });
    }
  } else {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value: any) => value.dara.nom == true) != undefined) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.dara.nom == true),
        1
      );
    }
  }
  if (this.dara.nom == '') {
    validationPrenom!.innerHTML = '';
  }
}

nomOustazeValidate() {
  let validationPrenom = document.getElementById('validationOustaze');
  const nomPrenomRegex = /^[a-zA-Z]{2,25}$/;
  if (nomPrenomRegex.test(this.dara.nomOuztas)) {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (
      this.truthyTab.find((value: any) => value.dara.nomOuztas == true) ==
      undefined
    ) {
      this.truthyTab.push({ nomOuztas: true });
    }
  } else {
    // console.log(nomPrenomRegex.test(this.prenom));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (
      this.truthyTab.find((value: any) => value.dara.nomOuztas == true) !=
      undefined
    ) {
      this.truthyTab.splice(
        this.truthyTab.findIndex((value: any) => value.dara.nomOuztas == true),
        1
      );
    }
  }
  if (this.dara.nomOuztas == '') {
    validationPrenom!.innerHTML = '';
  }
}


adresseValidate() {
  let validationPrenom = document.getElementById('validationAdresse');
  const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9]{3,}$/;
  if (nomPrenomRegex.test(this.dara.adresse)) {
    // console.log(nomPrenomRegex.test(this.adresse));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.dara.adresse==true)==undefined) {
      this.truthyTab.push({adresse:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.adresse));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.dara.adresse==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.dara.adresse==true),1);
    }
  }
  if (this.dara.adresse=="") {
    validationPrenom!.innerHTML="";
  }
}

regionValidate() {
  let validationPrenom = document.getElementById('validationRegion');
  const nomPrenomRegex = /^[a-zA-Z]+[a-z0-9]{3,}$/;
  if (nomPrenomRegex.test(this.selectedRegion)) {
    // console.log(nomPrenomRegex.test(this.adresse));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.selectedRegion==true)==undefined) {
      this.truthyTab.push({adresse:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.adresse));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.selectedRegion==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.selectedRegion==true),1);
    }
  }
  if (this.selectedRegion=="") {
    validationPrenom!.innerHTML="";
  }
}



telephoneDharaValidate() {
  let validationPrenom = document.getElementById('validationTelephoneDahra');
  const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
  if (nomPrenomRegex.test(this.dara.numeroTelephone)) {
    // console.log(nomPrenomRegex.test(this.numeroTelephone));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.dara.numeroTelephone==true)==undefined) {
      this.truthyTab.push({telephone:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.numeroTelephone));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.dara.numeroTelephone==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.dara.numeroTelephone==true),1);
    }
  }
  if (this.dara.numeroTelephone=="") {
    validationPrenom!.innerHTML="";
  }
}

telephoneOustazeValidate() {
  let validationPrenom = document.getElementById('validationTelephoneOustaze');
  const nomPrenomRegex = /^(77|76|75|78|33)[0-9]{7}$/;
  if (nomPrenomRegex.test(this.dara.numeroTelephoneOuztas)) {
    // console.log(nomPrenomRegex.test(this.numeroTelephoneOuztas));
    validationPrenom!.innerHTML = 'valide';
    validationPrenom!.classList.remove('error');
    validationPrenom!.classList.add('success');
    if (this.truthyTab.find((value:any)=>value.dara.numeroTelephoneOuztas==true)==undefined) {
      this.truthyTab.push({telephone:true});
    }

  } else {
    // console.log(nomPrenomRegex.test(this.numeroTelephoneOuztas));
    validationPrenom!.innerHTML = 'invalide';
    validationPrenom!.classList.remove('success');
    validationPrenom!.classList.add('error');
    if (this.truthyTab.find((value:any)=>value.telephone==true)!=undefined) {
      this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.dara.numeroTelephoneOuztas==true),1);
    }
  }
  if (this.dara.numeroTelephoneOuztas=="") {
    validationPrenom!.innerHTML="";
  }
}

// nombreTalibe Validators
nombreTalibes() {
let validationPrenom = document.getElementById('validationNombreTalibes');
const nomPrenomRegex = /^[0-9]+[0-9]$/;
if (nomPrenomRegex.test(this.dara.nombreTalibe.toString())) {
  // console.log(nomPrenomRegex.test(this.pass));
  validationPrenom!.innerHTML = 'valide';
  validationPrenom!.classList.remove('error');
  validationPrenom!.classList.add('success');
  if (this.truthyTab.find((value:any)=>value.nombreTalibe==true)==undefined) {
    this.truthyTab.push({nombreTalibe:true});
  }

} else {
  // console.log(nomPrenomRegex.test(this.pass));
  validationPrenom!.innerHTML = 'invalide';
  validationPrenom!.classList.remove('success');
  validationPrenom!.classList.add('error');
  if (this.truthyTab.find((value:any)=>value.nombreTalibe==true)!=undefined) {
    this.truthyTab.splice(this.truthyTab.findIndex((value:any)=>value.nombreTalibe==true),1);
  }
}
if (this.dara.nombreTalibe.toString()=="") {
  validationPrenom!.innerHTML="";
}
// console.log(this.truthyTab);
// console.log(this.truthyTab.length);
}



}
