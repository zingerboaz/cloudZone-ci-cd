import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-sign-result2',
  templateUrl: './sign-result2.component.html',
  styleUrls: ['./sign-result2.component.css']
})
export class SignResult2Component implements OnInit {
  updatedcompletepersonForm: any;
  updatepersonForm: any;
  user: any;
  roleNumber=100;


  constructor(private serverService: ServerService, private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {

    this.user = this.homeService.getUser();
    console.log(this.user)
    this.updatepersonForm = new FormGroup(  {
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      academic: new FormControl('', [Validators.required]),
      age: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(120)]),
      year: new FormControl(0, [Validators.required, Validators.min(2020), Validators.max(2030)]),
    });
  }

  sendForm() {
    const obj: any = {};
    for (const field in this.updatepersonForm.controls) { // 'field' is a string
      obj[field] = this.updatepersonForm.controls[field].value,this.roleNumber;
      console.log(obj)
      this.router.navigate(["/app-login1"]); 
    }

    const data = { roleNumber : this.roleNumber ,...this.user, ...obj, };

    this.serverService.updateDetails(data).subscribe(res => {
      this.homeService.setUser(data);
    }, err => {
      console.log(err);

    });
    console.log(data)

  }

}
