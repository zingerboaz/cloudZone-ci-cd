import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  header:string
  i:number;
  
  constructor() {
    this.header="hello"
    this.i=1
   }

  ngOnInit(): void {
  }
  onuzerClick() :void {
      this.header="you clicked"+this. i++

    }
}
