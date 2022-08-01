import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-see-result',
  templateUrl: './see-result.component.html',
  styleUrls: ['./see-result.component.css']
})
export class SeeResultComponent implements OnInit {

  constructor(public fireBase: FireBaseService) { }

  ngOnInit(): void {
  }

  

}
