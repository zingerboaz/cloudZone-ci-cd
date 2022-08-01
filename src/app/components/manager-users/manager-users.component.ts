import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { personModel } from '../models/person.model';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {
@Input()users:any[];
buttDisble:boolean
  constructor(public fireBase: FireBaseService,private router:Router) { }

  ngOnInit(): void {
    
  }

  showImg(index) {
    this.fireBase.currentAnswerTestIndex = index;
    console.log(index);

    this.router.navigate(['/app-answer-test-page'])
  }



}
