import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
c:number=0
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  loginUp():void{

this.router.navigate(["/app-login1"]); 
}


}
