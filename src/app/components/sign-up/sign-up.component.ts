import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  users_id: any;
  personForm: any;
  dataObj: any = [];
  phoneArr: Array<any> = ['972', '050', '11'];
  errors: any = '';

  constructor(private homeService: HomeService,
    private serverService: ServerService,
    private router: Router) { }

  ngOnInit(): void {

    this.personForm = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      passport: new FormControl(''),
      phonenumber: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
    
    });

    this.dataObj = [{
      name: 'ID Number',
      formControlName: 'id'
    },
    {
      name: 'Full Name',
      formControlName: 'full_name'
    },
    {
      name: 'Passport',
      formControlName: 'passport'
    },
    {
      name: 'Phone Number',
      formControlName: 'phonenumber',
      type: 'inputWithDropdown',
      arr: this.phoneArr
    },
    {
      name: 'password',
      formControlName: 'password'
    },
    {
      name: 'email',
      formControlName: 'email'
    },
  ]
  }

  sendForm() {
    console.log(this.personForm.value.name);
    
    
    
    this.homeService.createUser(this.personForm.value).subscribe(p => {
      this.homeService.setUser(p);
      this.router.navigate(["/app-code"]);
      
    }, err => {
      console.log('err', err);
        if(err.error && err.error.code === 11000) {
          // user exists
          this.errors = "User already exists";
          return;
        }
      }
    );
  }
}
