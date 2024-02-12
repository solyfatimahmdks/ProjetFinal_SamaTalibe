import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';

@Component({
  selector: 'app-list-dahra',
  templateUrl: './list-dahra.component.html',
  styleUrls: ['./list-dahra.component.css']
})
export class ListDahraComponent  implements OnInit{
  dahrasList: any[] = [];

  constructor(private allservicesService: AllservicesService) {}

  ngOnInit(): void {
    this.loadDahrasList();
  }

  loadDahrasList() {
    this.allservicesService.get('/lister-dahra', (response: any) => {
      this.dahrasList = response; 
    });
  }

}
