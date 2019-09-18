import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  time: string;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.time = (+ new Date()) + '';
    }, 1000);
  }

}
