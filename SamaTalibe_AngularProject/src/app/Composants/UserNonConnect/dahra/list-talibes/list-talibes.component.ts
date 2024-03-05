import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-list-talibes',
  templateUrl: './list-talibes.component.html',
  styleUrls: ['./list-talibes.component.css']
})
export class ListTalibesComponent implements OnInit {
  selectedDahra: any;
  talibesList: any[] = [];
talibe: any;
  uploadedImages: any;
dahra: any;

  constructor(private service: AllservicesService) { }

  ngOnInit(): void {
    this.selectedDahra = this.service.selectedDahra;
    this.loadTalibes('');
  }

  getImageUrl(event: any) {
    console.warn(event.target.files[0]);
    this.uploadedImages = event.target.files[0] as File;
  }

  getImage(path: string): string {
    // console.log( 'jjlkl' , path);
    if (
      path?.includes('.jpeg') ||
      path?.includes('.jpg') ||
      path?.includes('.png')
    ) {
      return `${environment.apiUrl}${path}`;
    } else {
      return 'https://placehold.co/20x20';
    }
  }

  loadTalibes(dahraId: string) {
    this.service.get(`/lister-talibe/${dahraId}`, (reponse: any[]) => {
      console.log('Liste des apprenants du dahra', reponse);
      this.talibesList = reponse;
      console.log('Liste des apprenants du dahra', this.talibesList);
    });
  }

  toggleList( dahraSelected?: string) {
    console.log(dahraSelected);
    this.loadTalibes(dahraSelected!);


    // if (section === 'dahra') {
    //   this.showListDahra = true;
    //   this.showListTalib = false;
    // } else if (section === 'talib') {
    //   this.showListDahra = false;
    //   this.showListTalib = true;
    //   this.loadTalibes(dahraSelected!);
    // }
  }
}
