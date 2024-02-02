
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sama-dahra',
  templateUrl: './sama-dahra.component.html',
  styleUrls: ['./sama-dahra.component.css']
})
// N'oubliez pas d'ajouter 'export' devant la classe
export class SamaDahraComponent {
  showListTalib = true;
  showListTalibArchiv = false;

  toggleView(view: string): void {
    this.showListTalib = view === 'listTalib';
    this.showListTalibArchiv = view === 'listTalibArchiv';
  }
}