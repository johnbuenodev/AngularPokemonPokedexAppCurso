import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  valueSearch: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getSearchValue(value:string) {
    this.valueSearch = value;
  }

}
