import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';


@Component({
  selector: 'app-don-user-non-connect',
  templateUrl: './don-user-non-connect.component.html',
  styleUrls: ['./don-user-non-connect.component.css']
})
export class DonUserNonConnectComponent {
  dons: any[] = []; 

  constructor(private service: AllservicesService) {}

  ngOnInit() {
   this.loadDons();
  }

  loadDons(){
    this.service.get('/liste-dons' , (response:any) =>{
      console.log(response);      
      this.loadDons = response ;
    })
  }

  
}
