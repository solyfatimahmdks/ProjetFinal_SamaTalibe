import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { AuthService } from 'src/app/service/auth-service.service';


@Component({
  selector: 'app-dons-user',
  templateUrl: './dons-user.component.html',
  styleUrls: ['./dons-user.component.css']
})
export class DonsUserComponent {
  user: any; // Contiendra les informations de l'utilisateur connecté
  donneeDonation: any = {}; // Contiendra les données de la donation
  showAllDonations: boolean = true;

  pagedDons: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 4; 
  
  dahra_name: any;
  disponibiliteDon: any;
  descriptionDon: any;
  adresseProvenance: any;
  date: any;
  typeDon: any;

  don: any = {
    statut:'',
    disponibiliteDon:'',
    descriptionDon:'',
    adresseProvenance:'',
    date:'',
    dahra_name:'',
    typeDon:'',
  };
  dons: any[] = []; // Initialisez comme un tableau vide
  myDons: any; // Initialisez comme un tableau vide
  dahras: any[]=[];
  
  

  constructor(private service: AllservicesService , private route: Router) {
    // this.user = this.authService.getLoggedInUser(); 
  }

  ngOnInit(): void {
     this.loadAllDons();
     this.loaddahras();
  }

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.service.message('Au revoir','success','deconnexion faite avec succès');
  }
  faireDonation() {
    this.don = {
    disponibiliteDon: this.disponibiliteDon,
    descriptionDon: this.descriptionDon,
    adresseProvenance:this.adresseProvenance,
    date: this.date,
    dahra_name: this.dahra_name,
    typeDon: this.typeDon,
    }

    console.log(this.don)
    


   this.service.post('/faire-don' ,this.don, (reponse: any) => {
        console.log(reponse);
        
      });
      this.loadAllDons();
      this.loadMyDonations();
    }

    loadAllDons() {
      this.service.get('/liste-dons', (reponse: any) => {
        console.log('test', reponse);
        this.dons=reponse;
      });
    }

    loadMyDonations(){
      this.service.getWithToken('/dons_donateur' , (response:any) => {
        console.log('test' , response);
        this.myDons = response ;
        
      })
    }


    toggleDonations(showAll: boolean) {
      this.showAllDonations = showAll;
      if (showAll) {
        this. loadAllDons();
      } else {
        this.loadMyDonations();
      }
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
      console.log("D:",this.dons.length);
  
      // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
      // const startIndex = (page - 1) * this.itemsPerPage;
      // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);
      
      // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);
  
      // Mettre à jour la page actuelle
      this.currentPage = page ;
      this.pagedDons =  this.paginatePerPage(this.currentPage,this.itemsPerPage,this.dons)
      console.log("D:",this.dons.length);
      console.log("d:",this.pagedDons.length);
   
    }

    loaddahras() {
      this.service.get('/lister-dahra', (reponse: any) => {
        console.log('test', reponse);
        this.dahras = reponse;
      });
    }
  
}
