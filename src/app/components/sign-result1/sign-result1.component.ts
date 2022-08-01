import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { personModel } from 'src/app/components/models/person.model';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-result1',
  templateUrl: './sign-result1.component.html',
  styleUrls: ['./sign-result1.component.css']
})
export class SignResult1Component implements OnInit {
  user: any = {};

  constructor(private router: Router, private homeService: HomeService, private serverService: ServerService) { }

  ngOnInit(): void {
    this.user = this.homeService.getUser();
  }

  check() {
    this.router.navigate(["/app-sign-result2"]);
  }
}


