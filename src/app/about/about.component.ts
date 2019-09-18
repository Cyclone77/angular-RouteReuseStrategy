import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  time: string;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.time = (+ new Date()) + '';
    }, 1000);
  }

}
