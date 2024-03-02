import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-parrain-maitre-coraniq',
  templateUrl: './parrain-maitre-coraniq.component.html',
  styleUrls: ['./parrain-maitre-coraniq.component.css']
})
export class ParrainMaitreCoraniqComponent {

  constructor(private allservicesService: AllservicesService, private route:Router) {}

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.allservicesService.message('Au revoir','success','deconnexion faite avec succès');
  }
}
