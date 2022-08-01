import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { HomeService } from 'src/app/services/home.service';
import { ServerService } from 'src/app/services/server.service';
import { personModel } from '../models/person.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  bool1: boolean = false;
  bool2: boolean = false;
  bool3: boolean = false;
  managerFrom: any
  errors: any = '';

  users: any[] = [];
 
  



  constructor(private homeService: HomeService, private serverService:
   ServerService,public fireBaseService:FireBaseService) { }

  
   ngOnInit(): void {
    this.managerFrom = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      email: new FormControl("", [Validators.required]),
    });
  }
  
  sendForm() {
    this.homeService.createUser(this.managerFrom.value).subscribe(p => {
      this.homeService.setUser(p);
    }, err => {
      console.log('err', err);
      if (err.error && err.error.code === 11000) {
        // user exists
        this.errors = "User already exists";
        return;
      }
    }
    );
  }

  findAllUsers() {
    this.bool1 = !this.bool1;
    this.serverService.getWithTokenArry("api/users/getAll").subscribe(data => {
      console.log(data)
      this.users = data;
    this.fireBaseService.allUsers=data;
    console.log(this.fireBaseService.allUsers);
    
    })
  }

  editingTest() {
    this.bool2 = !this.bool2;
  }
  
  delete() { 
  this.bool3 = !this.bool3;
  this.serverService.getWithTokenArry("api/users/getAll").subscribe(data => {
  this.fireBaseService.allUsers=data;
  })
this.serverService.getWithTokenArry("api/tests/getAllTests").subscribe(data => {
  this.fireBaseService.allTests = data as [];
   console.log(this.fireBaseService.allTests)
   console.log('in get all test')
 })
//   this.serverService.getWithToken('lll').subscribe(user=>console.log(user)
//  )

}



}

