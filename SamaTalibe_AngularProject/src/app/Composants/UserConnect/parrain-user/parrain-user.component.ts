import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/constants/constant';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-parrain-user',
  templateUrl: './parrain-user.component.html',
  styleUrls: ['./parrain-user.component.css']
})
export class ParrainUserComponent implements OnInit{
  parrainages: any;

  
  constructor(private service: AllservicesService , private route: Router ) {}

  ngOnInit(): void {}

  deconnexion(){
    this.route.navigate(['/accueil']);
    localStorage.removeItem(TOKEN_KEY);
    this.service.message('Au revoir','success','deconnexion faite avec succès');
  }
}
