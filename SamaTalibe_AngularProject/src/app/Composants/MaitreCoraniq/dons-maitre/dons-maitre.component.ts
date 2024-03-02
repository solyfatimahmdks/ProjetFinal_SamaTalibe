import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-dons-maitre',
  templateUrl: './dons-maitre.component.html',
  styleUrls: ['./dons-maitre.component.css']
})
export class DonsMaitreComponent {
  dons: any[] = []; // Initialisez comme un tableau vide


  constructor(private service: AllservicesService ,private route: Router ) {}

  ngOnInit(): void {
    this. loadAllDons();
 }

 loadAllDons() {
  this.service.getWithToken('/mes-dons', (reponse: any) => {
    console.log('test', reponse);
    console.log(this.loadAllDons);
    
    this.dons=reponse;

  });
}
deconnexion(){
  this.route.navigate(['/accueil']);
  localStorage.removeItem(TOKEN_KEY);
  this.service.message('Au revoir','success','deconnexion faite avec succès');
}
}
