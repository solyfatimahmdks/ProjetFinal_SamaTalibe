import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-parrain-ad-sup',
  templateUrl: './parrain-ad-sup.component.html',
  styleUrls: ['./parrain-ad-sup.component.css']
})
export class ParrainAdSupComponent {
parrains: any;
user: any;
cheminImageUtilisateur: any;
username: any;

  constructor(private allservicesService: AllservicesService, private route:Router) {}

  ngOnInit(): void {
    this.loadParrains();
    this.cheminImageUtilisateur = "../../../../assets/adminImg.png" ;
    this.username = "SOLY";

  }

  loadParrains() {
     this.allservicesService.get('/lister_parrainage' , (response:any) => {
       console.log(this.loadParrains());
       this.loadParrains = response ;
       
     })
  }

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.allservicesService.message('Au revoir','success','deconnexion faite avec succès');
  }

}
