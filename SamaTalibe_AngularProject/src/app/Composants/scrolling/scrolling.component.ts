import { Component } from '@angular/core';

@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.css']
})
export class ScrollingComponent {
  scrollToTop() {
    window.scrollTo(0,0);
   }

}
