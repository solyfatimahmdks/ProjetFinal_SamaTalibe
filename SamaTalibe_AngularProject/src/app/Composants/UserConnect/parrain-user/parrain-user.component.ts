import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-parrain-user',
  templateUrl: './parrain-user.component.html',
  styleUrls: ['./parrain-user.component.css']
})
export class ParrainUserComponent implements OnInit{
  parrainages: any;

  
  constructor(private service: AllservicesService ) {}

  ngOnInit(): void {}
  makeParrainage() {
    this.service.post('/creer-parrainage', {} , (reponse: any) => {
      console.log(reponse);
     this.parrainages = reponse;
     console.log(this.parrainages);
     
    });

}
}
