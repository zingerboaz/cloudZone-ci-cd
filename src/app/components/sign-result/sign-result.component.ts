import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { personModel } from 'src/app/components/models/person.model';

@Component({
  selector: 'app-sign-result',
  templateUrl: './sign-result.component.html',
  styleUrls: ['./sign-result.component.css']
})
export class SignResultComponent implements OnInit {
  user:any;
  persons: personModel[] = [];
  
  constructor(private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {
    this.user = this.homeService.getUser();
  }

  check(){
this.router.navigate(["/app-sign-result1"]);
    }
}
