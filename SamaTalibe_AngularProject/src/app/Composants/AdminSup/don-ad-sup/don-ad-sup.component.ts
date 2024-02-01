import { Component } from '@angular/core';
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

  constructor(private service: AllservicesService) {}

  ngOnInit(): void {
    this.loadDons();
  }

  loadDons() {
    this.service.get('/liste-dons', (reponse: any) => {
      console.log('test', reponse);
      this.dons=reponse;
    });
  }
}
