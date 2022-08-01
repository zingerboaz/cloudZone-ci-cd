import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { personModel } from 'src/app/components/models/person.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  user: any;
  Password  = {
    number: null
  };
  smsCode: number = 1234;
  c: number = 0;
  
  constructor(private homeService: HomeService,private router:Router) { }
  
  ngOnInit(): void {
    this.user = this.homeService.getUser();
  }

  check() {
    console.log(this.Password.number);

    if (this.Password.number == this.smsCode) {
      console.log('c=1');
      
      this.router.navigate(["/sign-result"]);
    }
    else {
     this.c = 2;
    }

  }
}
