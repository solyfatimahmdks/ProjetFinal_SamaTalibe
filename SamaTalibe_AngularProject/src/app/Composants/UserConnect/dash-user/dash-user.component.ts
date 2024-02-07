import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';


@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css']
})
export class DashUserComponent {
  dahras: any[] = [];

  constructor(private service: AllservicesService) {}

  ngOnInit() {
   this.loaddahras();
  }

  loaddahras() {
    this.service.get('/lister-dahra', (reponse: any) => {
      console.log('test', reponse);
      this.dahras=reponse;
    });
}

}
