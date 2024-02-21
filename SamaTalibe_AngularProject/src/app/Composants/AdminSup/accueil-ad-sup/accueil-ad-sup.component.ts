import { Component } from '@angular/core';
import { AllservicesService } from 'src/app/service/all-services-rest.service';
import * as ApexCharts from 'apexcharts';


@Component({
  templateUrl: './accueil-ad-sup.component.html',
  selector: 'app-accueil-ad-sup',
  styleUrls: ['./accueil-ad-sup.component.css'],
})

export class AccueilAdSupComponent{
  dahras: any[] = []; 
  pagedDahras: any[] = []; // Les données à afficher sur une page
  currentPage = 1; // Page actuelle
  itemsPerPage = 3; 
  
  constructor(private allservicesService: AllservicesService) {}

  ngOnInit(): void {
    this.getAllDahras();

    var options = {
      series: [{
      name: 'Mendicité',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      color: '#008FFB',
      
    }, {
      name: 'Talibé',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      color:'#00E396',
    }],
      chart: {
      type: 'bar',
      height: 250
    
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: '#00E396',
        background: '#00E396'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: ' (percent)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + " percent"
        }
      }
    },
    
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  getAllDahras() {
    this.allservicesService.get('/lister-dahra', (response: any) => {
      this.dahras = response; 
      this.setPage(this.currentPage); // Mettre à jour la pagination une fois que les données sont récupérées
      console.log(this.dahras);
      
    });
  }

getImage(path: string): string {
    if (path && (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png"))) {
        return path;
    } else {
        return "https://placehold.co/20x20";
    }
}

paginatePerPage(page: number, pageSize: number, data: any[]): any[] {
    if (!page) {
      return data;
    }
    const firsElementPerPage = pageSize * (page-1);
    const totalElements = firsElementPerPage + pageSize;
    return data.slice(firsElementPerPage, totalElements);
}
  
  setPage(page: number) {
    console.log("page:" ,page );
    console.log("D:",this.dahras.length);

    // Calculer l'index de début et de fin pour les éléments à afficher sur la page sélectionnée
    // const startIndex = (page - 1) * this.itemsPerPage;
    // const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.dahras.length - 1);
    
    // this.pagedDahras = this.dahras.slice(startIndex, endIndex + 1);

    // Mettre à jour la page actuelle
    this.currentPage = page ;
    this.pagedDahras =  this.paginatePerPage(this.currentPage,this.itemsPerPage,this.dahras)
    console.log("D:",this.dahras.length);
    console.log("d:",this.pagedDahras.length);
 
  }
}
