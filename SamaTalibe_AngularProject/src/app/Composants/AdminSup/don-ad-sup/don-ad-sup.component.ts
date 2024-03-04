import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-don-ad-sup',
  templateUrl: './don-ad-sup.component.html',
  styleUrls: ['./don-ad-sup.component.css']
})
export class DonAdSupComponent {
  dons: any[] = [];
  don: any;
  public:any;
  cheminImageUtilisateur: any;
  username: any;

  constructor(private service: AllservicesService , private route: Router) {}

  ngOnInit(): void {
    this.loadDons();
    this.cheminImageUtilisateur = "../../../../assets/adminImg.png" ;
    this.username = "SOLY";

  }


  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.service.message('Au revoir','success','deconnexion faite avec succès');
  }
  loadDons() {
    this.service.get('/liste-dons', (reponse: any) => {
      console.log('test', reponse);
      this.dons=reponse;
    });
  }
}
