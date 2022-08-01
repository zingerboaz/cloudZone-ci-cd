import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: any;
  registr: any
  errors: any = '';
  constructor(private homeService: HomeService, private serverService: ServerService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.homeService.getUser();
    this.registr = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl("", [Validators.required]),
    });

  }
  sendForm() {
    const obj: any = {}
    for (const field in this.registr.controls) {
      obj[field] = this.registr.controls[field].value;
    }
    console.log(obj)


    const data = { ...this.user, ...obj }

    this.serverService.updateDetails(data).subscribe(res => {
      this.homeService.setUser(data);
      this.router.navigate(["/app-code"]);
    }, err => {
      console.log('err', err);
        if(err.error && err.error.code === 11000) {
          // email exists
          this.errors = "Email already exists";
          return;
        }
      
    });
    console.log(data)
  }

}
