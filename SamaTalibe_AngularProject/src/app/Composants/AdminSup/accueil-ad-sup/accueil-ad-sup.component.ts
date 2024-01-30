import { Component } from '@angular/core';

@Component({
  templateUrl: './accueil-ad-sup.component.html',
  selector: 'app-accueil-ad-sup',
  styleUrls: ['./accueil-ad-sup.component.css'],
  template: `
  <ngx-charts-bar-vertical
    [view]="view"
    [scheme]="colorScheme"
    [results]="barChartData"
    [gradient]="gradient"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [xAxisLabel]="xAxisLabel"
    [yAxisLabel]="yAxisLabel"
    (select)="onSelect($event)"
  >
  </ngx-charts-bar-vertical>
`,
})

export class AccueilAdSupComponent{
  view: any[] = [400, 300];
  barChartData: any[] = [
    {
      name: 'Série 1',
      value: 10,
    },
    {
      name: 'Série 2',
      value: 20,
    },
    // Ajoutez autant de séries que nécessaire
  ];

  // Options pour personnaliser le graphique
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#C7B42C', '#AAAAAA'],
  };
  gradient = false;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'X-Axis Label';
  showYAxisLabel = true;
  yAxisLabel = 'Y-Axis Label';

  onSelect(event: any): void {
    // Gérer la sélection du graphique si nécessaire
    console.log(event);
  }
}
